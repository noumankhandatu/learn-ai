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
    Your task is to assess eligibility based on strict criteria and return a **valid JSON response ONLY**.
    
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
    3️⃣ Must be **willing to invest at least $3,500**.  

    ---  
    **Response Format (STRICT JSON ONLY, NO EXTRA TEXT):**  
    \`\`\`json
    {
      "subject": "Email Subject",
      "message": "Professional response message",
      "eligible": true or false
    }
    \`\`\`

    **Rules:**  
    - ✅ If eligible: Congratulate them, explain why they qualified, and tell them to check their email for an onboarding meeting link.  
    - ❌ If not eligible: Politely reject them, explain why, offer suggestions, and mention they will receive an **eBook** with improvement tips.  
    - ❗ **Return JSON only, no explanations or extra text!**  
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
