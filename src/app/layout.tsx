import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "12th House Mirror — Tarot Kit & Reflections",
  description:
    "A tarot deck for self-reflection. Not a glimpse into the future, but a mirror of the present.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-obsidian text-ivory">
        <Header />
        {children}
      </body>
    </html>
  );
}
