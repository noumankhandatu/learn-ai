import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Users, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master AI Development with LEARN.AI
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Transform your career with our comprehensive AI programming training. Learn from industry experts and
                  build real-world AI applications.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/enrollment">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Learning
                  </Button>
                </Link>
                <Link href="/coaching">
                  <Button size="lg" variant="outline">
                    View Programs
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://sjc.microlink.io/M858Q7fuDwtYczZQF37Qd6PP4gva9MGLqmKSuMlMBwJo3vrG4MUo4ZiDWakE79hp0kwwVwhWssNTL-1qQR1ljA.jpeg"
              alt="AI Learning Illustration"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose LEARN.AI?</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Our comprehensive program is designed to take you from basics to advanced AI development
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Brain className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Expert-Led Training</h3>
                  <p className="text-center text-gray-500">
                    Learn from industry professionals with real-world experience
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Code className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Hands-on Projects</h3>
                  <p className="text-center text-gray-500">Build real AI applications throughout the course</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Community Support</h3>
                  <p className="text-center text-gray-500">Join a network of AI developers and learners</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">Career Growth</h3>
                  <p className="text-center text-gray-500">Fast-track your career in AI development</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">
                Ready to Start Your AI Journey?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Join our next cohort and transform your career with cutting-edge AI skills
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/enrollment">
                <Button size="lg" variant="secondary">
                  Enroll Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

