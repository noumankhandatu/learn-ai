import FrequentlyAskedQuestions from "@/components/sections/faq";
import React from "react";

const page = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl"> Frequently Asked Questions</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">LearnAI FAQ – Your Guide to AI Learning </p>
          </div>
        </div>
      </section>
      <div style={{ height: 20 }} />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default page;
