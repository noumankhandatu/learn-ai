import React from "react";
import { Metadata } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
  title: {
    template: "LEARNAI.ONE | AI Programming Training",
    default: "LEARNAI | AI Programming Training",
  },
  description: "Explore AI Solutions and Learning Resources at LEARNAI.ONE. Empower Your Skills with Artificial Intelligence.",
  keywords: ["AI programming", "Machine Learning", "Deep Learning", "AI training", "Artificial Intelligence"],
  alternates: {
    canonical: "https://learnai.one/",
  },
  robots: "index, follow",
  openGraph: {
    title: "LEARNAI.ONE | AI Programming Training",
    description: "Explore AI Solutions and Learning Resources at LEARNAI.ONE. Empower Your Skills with Artificial Intelligence.",
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnaiai",
    title: "LEARNAI.ONE | AI Programming Training",
    description: "Explore AI Solutions and Learning Resources at LEARNAI.ONE. Empower Your Skills with Artificial Intelligence.",
    images: ["https://learnai.one/LEARNAI.png"],
  },
};

const Page = () => {
  return <Home />;
};

export default Page;
