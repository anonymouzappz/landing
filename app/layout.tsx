import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import PublicSupportFabMount from "@/components/PublicSupportFabMount";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://remoteforge.net";
const ogImage = "/images/og-remoteforge.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RemoteForge | One App. Every Remote.",
    template: "%s | RemoteForge",
  },
  description:
    "RemoteForge is a universal remote-control platform for supported TVs, streaming devices, Windows PCs, Home Assistant, Matter-ready smart devices, and local network control.",
  applicationName: "RemoteForge",
  keywords: [
    "RemoteForge",
    "universal remote app",
    "Roku remote",
    "Android TV remote",
    "Google TV remote",
    "Fire TV remote",
    "Windows PC remote",
    "Windows Companion",
    "Home Assistant remote",
    "Matter smart home",
    "Matter QR setup",
    "smart home remote",
    "WiFi remote control",
    "media remote",
    "keyboard mouse remote",
    "TV remote app",
  ],
  authors: [{ name: "Anonymouz Appz" }],
  creator: "Anonymouz Appz",
  publisher: "Anonymouz Appz",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RemoteForge",
    title: "RemoteForge | One App. Every Remote.",
    description:
      "Control supported TVs, streaming devices, Windows PCs, Home Assistant devices, Matter-ready smart devices, media playback, keyboard, mouse, and more from one powerful remote platform.",
    images: [
      {
        url: ogImage,
        width: 1350,
        height: 540,
        alt: "RemoteForge - One App. Every Remote.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RemoteForge | One App. Every Remote.",
    description:
      "A universal remote-control platform for supported TVs, streaming devices, Windows PCs, Home Assistant, Matter-ready smart devices, and local network control.",
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#040816] text-white selection:bg-cyan-300 selection:text-black">
        {children}

        <PublicSupportFabMount />

        {adsensePublisherId ? (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}