import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Obra | Formación para Profesionales",
  description: "Plataforma de capacitación interna para profesionales de las reformas.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/iconos/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/iconos/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/iconos/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased pb-24`}>
        <Header />
        <main className="min-h-screen max-w-5xl mx-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
