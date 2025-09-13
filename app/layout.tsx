import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import AIChatbot from "@/components/chatbot/AIChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waste→Resource Marketplace | Professional Waste Trading Platform",
  description: "Transform industrial waste into valuable resources through our AI-powered marketplace. Connect producers, recyclers, and corporates for sustainable waste management.",
  keywords: "waste management, recycling, sustainability, circular economy, industrial waste, green credits",
  authors: [{ name: "Waste→Resource Team" }],
  openGraph: {
    title: "Waste→Resource Marketplace",
    description: "Professional waste trading platform connecting producers, recyclers, and corporates",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}>
        <SessionProvider>
          
          <main className="pt-16 bg-white min-h-screen">
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </SessionProvider>
      </body>
    </html>
  );
}