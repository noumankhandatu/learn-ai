import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">Contact Us</h1>
            <p className="max-w-[700px] text-white/90 md:text-xl">
              Have questions? We're here to help you on your journey to mastering AI development
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 justify-center items-center ">
            <div className="space-y-4 lg:pl-32 lg:pr-32 ">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
                <p className="text-gray-500">Fill out the form below and we'll get back to you as soon as possible</p>
              </div>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea className="min-h-[150px]" id="message" placeholder="Enter your message" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
