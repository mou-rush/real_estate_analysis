import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { HeaderNavigation } from "@/common/HeaderNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Analysis Tool",
  description: "Property analysis and deal tracking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const navItems = [
    { label: "Deal Overview", href: "/deal-overview", isActive: false },
    { label: "Location Analysis", href: "/location-analysis", isActive: false },
    { label: "Workshop", href: "/workshop", isActive: false },
    { label: "Pipeline", href: "/pipeline", isActive: false },
    { label: "Settings", href: "/settings", isActive: false },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderNavigation navItems={navItems} />
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
