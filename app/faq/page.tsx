import React from "react";
import FrequentlyAskedQuestions from "@/components/sections/faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - LEARNAI.ONE | AI Learning Guide",
  description: "Find answers to common questions about AI training, machine learning courses, and expert-led coaching at LEARNAI.ONE.",
  alternates: {
    canonical: "https://learnai.one/LEARNAI.png",
  },
  openGraph: {
    title: "FAQ - LEARNAI.ONE | AI Learning Guide",
    description: "Get all your AI learning questions answered. Explore AI training, machine learning courses, and coaching programs.",
    url: "https://learnai.one/faq",
    siteName: "LEARNAI.ONE",
    images: [
      {
        url: "https://learnai.one/LEARNAI.png",
        width: 1200,
        height: 630,
        alt: "LEARNAI.ONE FAQ Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnaiai",
    title: "FAQ - LEARNAI.ONE | AI Learning Guide",
    description: "Answers to your AI training and machine learning questions at LEARNAI.ONE.",
    images: ["https://learnai.one/LEARNAI.png"],
  },
};

const FAQPage = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl"> Frequently Asked Questions</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">Your Guide to AI Learning at LEARNAI.ONE</p>
          </div>
        </div>
      </section>
      <div className="my-8" />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default FAQPage;
