import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Food Dash - Delicious Food Delivered Fast",
  description: "Order your favorite meals from the best restaurants with Food Dash",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cairo.className}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-orange-500 selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

