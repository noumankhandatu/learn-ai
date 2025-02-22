"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { StripePaymentProvider } from "@/components/stripe-payment-provider";

export default function EnrollmentPage() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const plans = [
    {
      name: "Fundamentals Track",
      price: 999,
      description: "Perfect for beginners starting their AI journey",
      features: [
        "Introduction to AI & Machine Learning",
        "Python Programming Fundamentals",
        "Basic Neural Networks",
        "4 Hands-on Projects",
        "Community Access",
        "3 Months Access",
      ],
    },
    {
      name: "Professional Track",
      price: 1999,
      description: "Comprehensive program for serious AI developers",
      features: [
        "Advanced AI Algorithms",
        "Deep Learning Specialization",
        "Natural Language Processing",
        "8 Industry Projects",
        "1-on-1 Mentoring",
        "6 Months Access",
      ],
      popular: true,
    },
    {
      name: "Enterprise Track",
      price: 3999,
      description: "Full-scale AI development and implementation",
      features: [
        "Custom AI Solution Development",
        "Enterprise Architecture",
        "MLOps & Deployment",
        "Unlimited Projects",
        "Dedicated Support Team",
        "12 Months Access",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">Enroll in LEARN.AI</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">Choose the perfect learning path to kickstart your AI development career</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white lg:pl-20 lg:pr-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? "border-blue-600 shadow-lg" : ""}>
                <CardHeader>
                  {plan.popular && <div className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm text-white mb-2">Most Popular</div>}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/course</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setSelectedPlan({ name: plan.name, price: plan.price })}
                  >
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Enrollment</DialogTitle>
            <DialogDescription>Secure payment for {selectedPlan?.name}</DialogDescription>
          </DialogHeader>
          {selectedPlan && <StripePaymentProvider amount={selectedPlan.price} planName={selectedPlan.name} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
