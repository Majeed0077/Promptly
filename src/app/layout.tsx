import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-app",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "promptiny.online",
  description: "A calm prompt library for saving and reusing your best work.",
  manifest: "/favicon_io%20(1)/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon_io%20(1)/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io%20(1)/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      { url: "/favicon_io%20(1)/favicon.ico" },
    ],
    shortcut: "/favicon_io%20(1)/favicon.ico",
    apple: "/favicon_io%20(1)/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
