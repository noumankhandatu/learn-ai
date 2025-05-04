import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, BookOpen, Users, Trophy } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ApplicationForm from "@/components/assessment-form";

export const metadata: Metadata = {
  title: "AI Coaching Program | LEARNAI.ONE - AI Programming Training",
  description:
    "Join our expert-led AI coaching program at LEARNAI.ONE. Get personalized mentorship, career support, and hands-on learning in AI, ML, and Deep Learning.",
  keywords: [
    "AI coaching",
    "Machine Learning training",
    "Deep Learning program",
    "AI mentorship",
    "Artificial Intelligence course",
    "AI career guidance",
  ],
  alternates: {
    canonical: "https://learnai.one/coaching",
  },
  openGraph: {
    title: "AI Coaching Program | LEARNAI.ONE - AI Programming Training",
    description:
      "Master AI with our expert-led coaching program. Personalized mentorship, hands-on projects, and career guidance to boost your AI skills.",
    url: "https://learnai.one/coaching",
    siteName: "LEARNAI.ONE",
    images: [
      {
        url: "https://learnai.one/LEARNAI.png",
        width: 1200,
        height: 630,
        alt: "LEARNAI.ONE AI Coaching Program",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnaiai",
    title: "AI Coaching Program | LEARNAI.ONE",
    description: "Get expert-led AI coaching at LEARNAI.ONE. Personalized mentorship, career guidance, and hands-on AI projects.",
    images: ["https://learnai.one/LEARNAI.png"],
  },
  robots: "index, follow",
};

export default function CoachingPage() {
  const features = [
    {
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      title: "Expert-Led Training",
      description: "Learn from industry professionals with over 10 years of experience in AI development and implementation.",
    },
    {
      icon: <BookOpen className="h-12 w-12 text-blue-600" />,
      title: "Comprehensive Curriculum",
      description: "From fundamentals to advanced concepts, our program covers everything you need to succeed in AI.",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "1-on-1 Mentorship",
      description: "Get personalized guidance and support throughout your learning journey.",
    },
    {
      icon: <Trophy className="h-12 w-12 text-blue-600" />,
      title: "Career Support",
      description: "Receive guidance on job placement, interview preparation, and portfolio development.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">AI Coaching Program</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">
              Transform your career with personalized AI development coaching. <br />
              <span className="font-semibold text-white">Enroll now and start your AI journey today!</span>
            </p>

            <div className="space-x-4">
              <Link href="#assessment">
                <Button variant="secondary" size="lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Assessment Form */}
      <section id="assessment" className="w-full py-12 md:py-24 lg:py-32 bg-white flex justify-center items-center">
        <div className="container max-w-4xl px-4 md:px-6">
          <ApplicationForm />
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white lg:pl-20 lg:pr-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    {feature.icon}
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 lg:pl-20 lg:pr-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Program Overview</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              Our comprehensive coaching program is designed to take you from basics to advanced AI development
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Foundation Phase</h3>
                <ul className="space-y-2 text-gray-500">
                  <li>• Introduction to AI & ML</li>
                  <li>• Python Programming</li>
                  <li>• Data Structures</li>
                  <li>• Basic Neural Networks</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Advanced Concepts</h3>
                <ul className="space-y-2 text-gray-500">
                  <li>• Deep Learning</li>
                  <li>• Natural Language Processing</li>
                  <li>• Computer Vision</li>
                  <li>• Reinforcement Learning</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Professional Skills</h3>
                <ul className="space-y-2 text-gray-500">
                  <li>• Project Management</li>
                  <li>• System Design</li>
                  <li>• Deployment Strategies</li>
                  <li>• Business Applications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
