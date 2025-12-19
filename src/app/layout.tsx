import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Woodlands LAN 2026 | May 21-24",
  description: "The ultimate LAN party experience returns. Join us for a weekend of gaming, chaos, and questionable life choices.",
  keywords: ["LAN party", "gaming", "The Woodlands", "2026", "esports"],
  openGraph: {
    title: "The Woodlands LAN 2026",
    description: "The ultimate LAN party experience returns. May 21-24, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* CRT Scanline Overlay */}
        <div className="crt-overlay" aria-hidden="true" />

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
