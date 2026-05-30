import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Mandjaku — Langue & Culture Manjak",
    template: "%s · Mandjaku",
  },
  description:
    "Plateforme éducative pour la langue et la culture Manjak — alphabet, histoire, clavier, apprentissage. Kabu lëp Manjak.",
  keywords: [
    "Manjak", "Mandjaku", "langue atlantique", "Guinée-Bissau",
    "alphabet africain", "culture Manjak", "Cacheu",
  ],
  authors: [{ name: "LUVlab.io" }],
  themeColor: "#009E49",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
