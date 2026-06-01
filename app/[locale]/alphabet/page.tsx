import { redirect } from "next/navigation";

export default async function AlphabetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}?tab=alphabet`);
}
