import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { sendEmail } from "./emailService";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Missing OpenAI API Key. Please check your environment variables.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, currentOccupation, timeCommitment, reasons, investmentRange } = body;

    const prompt = `
    You are an AI admissions assistant for LEARNAI, evaluating applications for an AI training program.
    Your task is to assess eligibility based on strict criteria and return **ONLY JSON output**.
    
    ---
    **Applicant Details:**
    - Full Name: ${firstName} ${lastName}
    - Email: ${email}
    - Phone: ${phoneNumber}
    - Occupation: ${currentOccupation}
    - Weekly Commitment: ${timeCommitment} hours
    - Reasons: ${reasons.join(", ")}
    - Investment Range: ${investmentRange}
    
    ---
    **Eligibility Criteria:**
    1️⃣ Minimum **1 hour per week** commitment required.
    2️⃣ A valid **reason for enrolling** is required (not 'None').
    3️⃣ Must be **willing to invest at least $4,000**.
    
    ---
    **STRICT JSON Response Format (NO EXTRA TEXT OUTSIDE JSON)**:
    \`\`\`json
    {
      "subject": "Email Subject",
      "message": "Detailed, professional response message (at least 200 words)",
      "eligible": true or false
    }
    \`\`\`
    
    ---
    ### **Message Guidelines**
    - ✅ If eligible: 
      - Congratulate the applicant and emphasize why they qualified.
      - Clearly state that they should check their email for an **onboarding meeting link**.
      - Provide a **motivational and engaging** response that encourages participation.
    
    - ❌ If not eligible:
      - Politely reject them and explain the reasons.
      - Offer actionable suggestions for improving their qualifications.
      - Inform them that they will receive an **eBook** with improvement tips.
      - Keep the tone **encouraging and constructive**.
    
    ---
    🚨 **IMPORTANT RULES:**  
    - **Return JSON ONLY.** No extra text, greetings, explanations, or additional formatting.
    - **Ensure the message is at least 200 words** to provide a detailed response.
    - **DO NOT include any text outside the JSON block.**
    `;

    // Generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
    });

    // Validate response structure
    if (!response.choices || response.choices.length === 0 || !response.choices[0].message?.content) {
      throw new Error("Invalid response from OpenAI.");
    }

    const rawResponse = response.choices[0].message.content.trim();
    console.log("🛠️ Raw AI Response:", rawResponse);

    let aiResponse;
    try {
      // Extract JSON if AI includes extra text
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No valid JSON found in AI response.");

      aiResponse = JSON.parse(jsonMatch[0]);

      // Ensure required fields exist
      if (!("subject" in aiResponse) || !("message" in aiResponse) || !("eligible" in aiResponse)) {
        throw new Error("Incomplete JSON response from AI.");
      }
    } catch (parseError) {
      console.error("🚨 JSON Parsing Error:", parseError, "Raw content:", rawResponse);
      throw new Error("Failed to parse AI response. Check AI output format.");
    }

    // Send email
    await sendEmail(email, aiResponse.subject, aiResponse.message, aiResponse.eligible);

    return NextResponse.json({
      success: true,
      message: aiResponse.message || "No response generated.",
      eligible: aiResponse.eligible ?? false,
    });
  } catch (error) {
    console.error("❌ Full Error Details:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to process request." }, { status: 500 });
  }
}
