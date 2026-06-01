import type { Metadata } from "next";
import TabApp from "@/components/TabApp";
import { supabase } from "@/lib/supabase";
import { SEO_DEFAULTS } from "@/data/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
};

async function getTabSeo(tab: string) {
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

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { tab } = await searchParams;
  const id = tab ?? "home";
  const seo = await getTabSeo(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mandjaku.com";
  const pageUrl = `${siteUrl}/${locale}${id !== "home" ? `?tab=${id}` : ""}`;
  const ogImageUrl = `${siteUrl}/${locale}/opengraph-image${id !== "home" ? `?tab=${id}` : ""}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ?? [],
    openGraph: {
      title: seo.og_title ?? seo.title,
      description: seo.og_description ?? seo.description,
      url: pageUrl,
      siteName: "Mandjaku",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: seo.og_title ?? "Mandjaku" }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.og_title ?? seo.title,
      description: seo.og_description ?? seo.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({ searchParams }: Props) {
  const { tab } = await searchParams;
  return <TabApp initialTab={tab ?? "home"} />;
}
