import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "../ThemeContext";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Lichtzen | Global Leader in UV & MIR Optical Systems",
    template: "%s | Lichtzen"
  },
  description: "High-precision UV curing and MIR drying solutions for EV Battery, OLED, and Semiconductor industries. Engineering light for industrial innovation.",
  keywords: ["UV Curing", "MIR Drying System", "Roll-to-Roll UV", "Spot UV", "OLED Sealing", "Battery Electrode Drying"],
  authors: [{ name: "Lichtzen Co., Ltd." }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lichtzen.com",
    siteName: "Lichtzen Global",
    title: "Lichtzen | The Precision of Light",
    description: "Leading manufacturer of UV/IR optical systems for high-tech manufacturing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lichtzen Optical Engineering",
    description: "Future of industrial light control.",
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('lichtzen-theme') || 'deep-navy';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-skin-foreground bg-skin-base min-h-screen selection:bg-brand-violet/30 selection:text-white`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
