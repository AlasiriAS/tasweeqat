import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Tasweeqat | تسويقات — Digital Marketing Agency",
  description:
    "Tasweeqat is a Saudi-based digital agency specializing in website design, hosting, social media marketing, and CRM systems. نبني مواقع ونحقق نتائج.",
  keywords: ["tasweeqat", "digital marketing", "website design", "Saudi Arabia", "تسويقات"],
  openGraph: {
    title: "Tasweeqat | تسويقات",
    description: "Your digital growth partner in Saudi Arabia",
    url: "https://tasweeqat.com",
    siteName: "Tasweeqat",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
