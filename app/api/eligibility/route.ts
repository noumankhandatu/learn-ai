import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you set this in your .env file
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received Payload:", body); // ✅ Debug: Logs incoming data

    const { firstName, lastName, email, phoneNumber, currentOccupation, timeCommitment, importance, reasons, investmentRange } = body;

    // Constructing prompt dynamically
    const prompt = `
      You are an AI assistant evaluating a user's eligibility for an AI training program from LEARNAI.
      Analyze the user's input carefully and determine whether they qualify.

      **User Details**:
      - First Name: ${firstName}
      - Last Name: ${lastName}
      - Email: ${email}
      - Phone Number: ${phoneNumber}
      - Current Occupation: ${currentOccupation}
      - Weekly Time Commitment: ${timeCommitment}
      - Importance of Enrolling: ${importance}
      - Reason for Enrolling: ${reasons.join(", ")}
      - Investment Range: ${investmentRange}

      **Eligibility Criteria**:
      1. Must commit at least 1 hour per week.
      2. Must rate enrollment importance as 2 or higher.
      3. Must select a valid reason (not 'None').
      4. Must be willing to invest at least $2,500.

      **Response Rules**:
      - If eligible: Congratulate the user and inform them about the meeting link via email.
      - If not eligible: Politely reject with improvement suggestions and notify them about an ebook being sent to their email.
      - Make a final decision with no requests for more details.
    `;

    console.log("Constructed Prompt:", prompt); // ✅ Debug: Logs the AI input

    // Generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
    });

    console.log("AI Response:", response.choices[0]?.message?.content); // ✅ Debug: Logs AI response

    return NextResponse.json({
      success: true,
      message: response.choices[0]?.message?.content || "No response generated.",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process request." }, { status: 500 });
  }
}
