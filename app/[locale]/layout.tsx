import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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
    default: "Manjaku — Langue & Culture Manjak",
    template: "%s · Manjaku",
  },
  description:
    "Plateforme éducative pour la langue et la culture Manjak — alphabet, histoire, clavier, apprentissage. Kabu lëp Manjak.",
  keywords: [
    "Manjak", "Manjaku", "langue atlantique", "Guinée-Bissau",
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
  const a = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <a href="#main" className="skip-link">{a("skip_to_content")}</a>
              <Navigation />
              <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
              <Footer />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
