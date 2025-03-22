import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import AIProductSection from "../sections/path";
import MarketDemandSection from "../sections/MarketDemand";
import LearnAIAdvantage from "../sections/LearnAIAdvantage";
import AboutLearnAI from "../sections/AboutLearnAI";
import WhatSetsLearnAIApart from "../sections/WhatSetsLearnAIApart";
import ProgramDetails from "../sections/ProgramDetails";
import FrequentlyAskedQuestions from "../sections/faq";
import WhyChooseLearnAI from "../sections/WhyChooseLearnAI";
import Different from "../sections/Different";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-24 xl:py-24 bg-[#F9FAFB] ">
        <div className="container px-4 md:px-6 ">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 lg:pl-20 lg:pr-20 ">
            <div className="flex flex-col justify-center space-y-4 ">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none  text-[#1e90ff]">
                  LEARN <span className="text-[#ff7f50]">AI</span> : AI Product Manager
                </h1>
                <div style={{ height: 20 }} />
                <p className="max-w-[600px]  md:text-3xl text-[#1e90ff]">
                  Become a <span className="text-[#ff7f50]">High-Performing AI Leader</span>
                </p>{" "}
                <div style={{ height: 20 }} />
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                Transform your career with our proven CLEAR methodology—no prior technical experience required. Unlock salaries of $199K+ and create lucrative passive income streams.
                </p>{" "}
                <div style={{ height: 20 }} />
                <i className="max-w-[600px] text-gray-500 md:text-lg">
                  From overwhelmed to empowered. From curious to confident. From job seeker to high-earning AI leader.
                </i>
              </div>
              <div style={{ height: 20 }} />

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* <Link href="/enrollment">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Learning
                  </Button>
                </Link> */}
                <Link href="#details">
                  <Button size="lg" className="bg-[#1e90ff] text-white" variant="outline">
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/glassdoor.png"
              alt="AI Learning Illustration"
              width={600}
              height={400}
              className="mx-auto  overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <div style={{ height: 20 }} />
      <AIProductSection />
      <div style={{ height: 20 }} />
      <MarketDemandSection />
      <div style={{ height: 20 }} />
      <LearnAIAdvantage />

      <div style={{ height: 20 }} />
      <div style={{ height: 20 }} />

      <WhyChooseLearnAI />
      <div id="details" style={{ height: 20 }} />

      <ProgramDetails />
      <div style={{ height: 20 }} />

      <WhatSetsLearnAIApart />
      <div style={{ height: 20 }} />

      <Different />
      <div style={{ height: 20 }} />

      <div style={{ height: 20 }} />
    </div>
  );
}
