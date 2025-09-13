import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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
  title: "Authentication | Waste→Resource Marketplace",
  description: "Sign in or create an account to access the Waste→Resource Marketplace",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen`}>
        <SessionProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <AIChatbot />
        </SessionProvider>
      </body>
    </html>
  );
}
