import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { SEO_DEFAULTS } from "@/data/seo";

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  // When called with auth header (login check), validate the password
  const auth = req.headers.get("x-admin-password");
  if (auth !== null && auth !== process.env.ADMIN_PASSWORD) {
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
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, title, description, og_title, og_description, keywords, og_image_headline, og_image_sub } = body;

  if (!id || !title || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
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
