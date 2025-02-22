import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold">Payment Successful!</h1>
        <p className="mt-4 text-gray-600">
          Thank you for enrolling in our program. You will receive a confirmation email shortly with further
          instructions.
        </p>
        <div className="mt-8">
          <Link href="/coaching">
            <Button>View Your Program</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

