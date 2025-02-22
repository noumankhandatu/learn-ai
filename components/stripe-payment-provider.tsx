"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { PaymentForm } from "./payment-form"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripePaymentProviderProps {
  amount: number
  planName: string
}

export function StripePaymentProvider({ amount, planName }: StripePaymentProviderProps) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, planName }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount, planName])

  return (
    <div className="w-full max-w-md mx-auto">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          <PaymentForm amount={amount} planName={planName} />
        </Elements>
      )}
    </div>
  )
}

