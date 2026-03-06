import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeRoute — UAE Crisis Situational Awareness",
  description: "Real-time crisis information for Swedish expats and visitors in UAE during the Iran conflict. Flight status, embassy info, evacuation routes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SafeRoute",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} antialiased font-sans bg-[#0a0a0f] text-[#e5e5ef] min-h-screen`}>
        <Navigation />
        <main className="pb-20 md:pb-4">
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 md:relative bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/5 md:border-0 z-40 md:z-auto">
          <div className="hidden md:block text-center py-3 text-xs text-[#8888a0]">
            Data from official sources only. Verify critical decisions with your embassy.
          </div>
        </footer>
      </body>
    </html>
  );
}
