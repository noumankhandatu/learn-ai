import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Users, Star } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead AI Instructor",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Former AI Research Lead at Tech Giant with 10+ years of experience in machine learning and deep learning.",
    },
    {
      name: "Michael Rodriguez",
      role: "Technical Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "20+ years in software development, specialized in AI implementation and architecture.",
    },
    {
      name: "Dr. James Wilson",
      role: "Curriculum Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "PhD in Computer Science, developed AI curricula for leading universities.",
    },
    {
      name: "Emily Chang",
      role: "Career Coach",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Certified career coach with expertise in tech industry placement and career development.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">About LEARN.AI</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">
              Empowering the next generation of AI developers through expert-led training and hands-on experience
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white lg:pl-20 lg:pr-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-sm text-gray-500">Courses Offered</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-3xl font-bold">1000+</h3>
                <p className="text-sm text-gray-500">Students Trained</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-3xl font-bold">95%</h3>
                <p className="text-sm text-gray-500">Success Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Star className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-3xl font-bold">4.9/5</h3>
                <p className="text-sm text-gray-500">Student Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 lg:pl-20 lg:pr-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Expert Team</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">Learn from industry professionals with decades of combined experience</p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
