import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { SEO_DEFAULTS } from "@/data/seo";

export const runtime = "edge";
export const alt = "Mandjaku";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getSeo(tab: string) {
  try {
    const { data } = await supabase
      .from("manjak_seo_config")
      .select("*")
      .eq("id", tab)
      .single();
    return data ?? SEO_DEFAULTS[tab] ?? SEO_DEFAULTS.home;
  } catch {
    return SEO_DEFAULTS[tab] ?? SEO_DEFAULTS.home;
  }
}

export default async function OgImage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { tab?: string };
}) {
  const tab = searchParams?.tab ?? "home";
  const seo = await getSeo(tab);
  const headline = seo.og_image_headline ?? "Mandjaku";
  const sub = seo.og_image_sub ?? "Kabu lëp Manjak";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0F1419",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Guinea-Bissau kente stripe top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "repeating-linear-gradient(90deg, #009E49 0px, #009E49 30px, #FCD116 30px, #FCD116 54px, #CE1126 54px, #CE1126 84px, #FCD116 84px, #FCD116 108px, #009E49 108px, #009E49 138px)",
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(0,158,73,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(206,17,38,0.05)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            height: "100%",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #009E49, #007A38)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                fontSize: "28px",
                color: "#fff",
              }}
            >
              M
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#F1F5F9", fontWeight: "700", fontSize: "22px" }}>
                Mandjaku
              </span>
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>
                Kabu lëp Manjak
              </span>
            </div>

            <div
              style={{
                marginLeft: "auto",
                padding: "6px 16px",
                borderRadius: "9999px",
                background: "rgba(0,158,73,0.15)",
                border: "1px solid rgba(0,158,73,0.30)",
                color: "#00C45A",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              mandjaku.com
            </div>
          </div>

          {/* Main headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontSize: "96px",
                fontWeight: "900",
                letterSpacing: "-4px",
                lineHeight: "1",
                background: "linear-gradient(135deg, #009E49, #00C45A)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {headline}
            </div>
            <div
              style={{
                fontSize: "42px",
                fontWeight: "600",
                color: "#F1F5F9",
                letterSpacing: "-1px",
              }}
            >
              {sub}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#94A3B8",
                marginTop: "8px",
                maxWidth: "700px",
                lineHeight: "1.5",
              }}
            >
              {seo.og_description ?? seo.description}
            </div>
          </div>

          {/* Bottom flag dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#009E49" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FCD116" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#CE1126" }} />
            <span style={{ color: "#4A6380", fontSize: "14px", marginLeft: "6px" }}>
              Guinée-Bissau · Sénégal · Gambie · Diaspora
            </span>
          </div>
        </div>

        {/* Kente stripe bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background:
              "repeating-linear-gradient(90deg, #CE1126 0px, #CE1126 30px, #FCD116 30px, #FCD116 54px, #009E49 54px, #009E49 84px, #FCD116 84px, #FCD116 108px, #CE1126 108px, #CE1126 138px)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
