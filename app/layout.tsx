import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://remoteforge.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RemoteForge | One App. Every Remote.",
    template: "%s | RemoteForge",
  },
  description:
    "RemoteForge is a universal remote-control platform for Roku TVs, Windows PCs, media playback, keyboard, mouse, and future smart devices.",
  applicationName: "RemoteForge",
  keywords: [
    "RemoteForge",
    "universal remote app",
    "Roku remote",
    "Windows PC remote",
    "Android remote app",
    "smart TV remote",
    "PC companion app",
    "WiFi remote control",
    "media remote",
    "keyboard mouse remote",
  ],
  authors: [{ name: "Anonymouz Appz" }],
  creator: "Anonymouz Appz",
  publisher: "Anonymouz Appz",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RemoteForge",
    title: "RemoteForge | One App. Every Remote.",
    description:
      "Control Roku TVs, Windows PCs, media playback, keyboard, mouse, and future smart devices from one powerful remote platform.",
    images: [
      {
        url: "/images/og-remoteforge.jpg",
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
      "A universal remote-control platform for Roku TVs, Windows PCs, media playback, keyboard, mouse, and future smart devices.",
    images: ["/images/og-remoteforge.jpg"],
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#040816] text-white selection:bg-cyan-300 selection:text-black">
        {children}
      </body>
    </html>
  );
}