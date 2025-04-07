import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEARNAI.ONE - AI Programming & Training",
  description: "Master AI development with expert-led training programs. Learn AI, ML, and deep learning from industry leaders.",
  alternates: {
    canonical: "https://learnai.one/",
  },
  openGraph: {
    title: "LEARNAI.ONE - AI Programming & Training",
    description: "Join LEARNAI.ONE to master AI, Machine Learning, and Deep Learning through expert-led courses.",
    url: "https://learnai.one/",
    siteName: "LEARNAI.ONE",
    images: [
      {
        url: "https://learnai.one/LEARNAI.png",
        width: 1200,
        height: 630,
        alt: "LEARNAI.ONE Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnaiai",
    title: "LEARNAI.ONE - AI Programming & Training",
    description: "Master AI, ML, and Deep Learning with expert training at LEARNAI.ONE.",
    images: ["https://learnai.one/LEARNAI.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
