import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SEO_DEFAULTS } from "@/data/seo";
import { getAdminClient } from "@/lib/supabase-admin";
import { timingSafeEqual } from "node:crypto";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Constant-time comparison. An unset ADMIN_PASSWORD never matches. */
function passwordMatches(given: string | null) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || given === null) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function checkAuth(req: NextRequest) {
  return passwordMatches(req.headers.get("x-admin-password"));
}

export async function GET(req: NextRequest) {
  // When called with auth header (login check), validate the password
  const auth = req.headers.get("x-admin-password");
  if (auth !== null && !passwordMatches(auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("manjak_seo_config")
    .select("*")
    .order("id");

  if (error) {
    return NextResponse.json({ rows: Object.values(SEO_DEFAULTS) });
  }

  const rows = Object.keys(SEO_DEFAULTS).map((id) => {
    const row = data?.find((r) => r.id === id);
    return row ?? SEO_DEFAULTS[id];
  });

  return NextResponse.json({ rows });
}

export async function PUT(req: NextRequest) {
  // Two ways in: the emergency password (writes with the service role key),
  // or a signed-in administrator (writes with their own session; the database
  // rule on manjak_seo_config lets only administrators through).
  let db;
  if (checkAuth(req)) {
    db = getAdminClient();
    if (!db) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY manquante sur le serveur. Connectez-vous avec votre compte pour enregistrer." },
        { status: 503 },
      );
    }
  } else {
    const cookieStore = await cookies();
    const userClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } },
    );
    const { data: role } = await userClient.rpc("manjak_my_role");
    if (role !== "superadmin" && role !== "editor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    db = userClient;
  }

  const body = await req.json();
  const { id, title, description, og_title, og_description, keywords, og_image_headline, og_image_sub } = body;

  if (!id || !title || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await db
    .from("manjak_seo_config")
    .upsert({
      id,
      title,
      description,
      og_title,
      og_description,
      keywords: Array.isArray(keywords) ? keywords : keywords?.split(",").map((k: string) => k.trim()).filter(Boolean),
      og_image_headline,
      og_image_sub,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ row: data });
}
