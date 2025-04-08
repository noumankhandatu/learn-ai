// import { type NextRequest, NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// })

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { amount, planName } = body

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Convert to cents
//       currency: "usd",
//       metadata: {
//         planName,
//       },
//     })

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret })
//   } catch (error) {
//     console.error("Error:", error)
//     return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
//   }
// }
