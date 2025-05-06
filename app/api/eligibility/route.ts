import { type NextRequest, NextResponse } from "next/server";
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

    // Extract data from the new structured form payload
    const { personalInfo, professionalBackground, aiExperience, goalsAndChallenges, commitmentAssessment, professionalEtiquette, submittedAt } = body;

    // Map financial situation to investment range
    let investmentRange = "Under $1,000";
    if (commitmentAssessment.financialSituation.includes("over $1000")) {
      investmentRange = "Over $1,000";
    }

    // Map agreement to time commitment
    const timeCommitment = professionalEtiquette.agreeToBeFocused.startsWith("Yes") ? "Committed" : "Not committed";

    // Extract reasons from goals and challenges
    const reasons = [goalsAndChallenges.biggestChallenge, goalsAndChallenges.holdingBack, goalsAndChallenges.desiredOutcome].filter(
      (reason) => reason && reason.trim() !== ""
    );

    const prompt = `
    You are an AI admissions assistant for LEARNAI, evaluating applications for an AI coaching accelerator program.
    Your task is to assess eligibility based on strict criteria and return **ONLY JSON output**.
    
    ---
    **Applicant Details:**
    - Full Name: ${personalInfo.firstName} ${personalInfo.lastName}
    - Email: ${personalInfo.emailAddress}
    - Phone: ${personalInfo.phoneNumber}
    - Employment Status: ${professionalBackground.employmentStatus}
    - Occupation: ${professionalBackground.occupation}
    - AI Background: ${aiExperience.aiBackground}
    - AI Knowledge Level: ${aiExperience.aiKnowledge}
    - Prior AI Training: ${aiExperience.priorTraining}
    - Biggest AI Challenge: ${goalsAndChallenges.biggestChallenge}
    - What's Holding Them Back: ${goalsAndChallenges.holdingBack}
    - Desired Outcome: ${goalsAndChallenges.desiredOutcome}
    - Financial Situation: ${commitmentAssessment.financialSituation}
    - Professional Commitment: ${professionalEtiquette.agreeToBeFocused}
    - Application Date: ${submittedAt}
    
    ---
    **Eligibility Criteria:**
    1️⃣ Must agree to be fully present and focused during scheduled calls.
    2️⃣ Must have valid reasons for enrolling in the program (check their challenges and desired outcomes).
    3️⃣ Must have access to financial resources (over $1,000 across accounts).
    
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
      - Reference their specific AI challenges and goals in your response.
    
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
      max_tokens: 800, // Increased to accommodate longer responses
    });

    // Validate response structure
    if (!response.choices || response.choices.length === 0 || !response.choices[0].message?.content) {
      throw new Error("Invalid response from OpenAI.");
    }

    const rawResponse = response.choices[0].message.content.trim();

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
      console.log("🚨 JSON Parsing Error:", parseError, "Raw content:", rawResponse);
      throw new Error("Failed to parse AI response. Check AI output format.");
    }

    // Send email
    await sendEmail(personalInfo.emailAddress, personalInfo.firstName, personalInfo.lastName, personalInfo.phoneNumber, aiResponse.eligible);
    // await sendEmail(personalInfo.emailAddress, aiResponse.subject, aiResponse.message, aiResponse.eligible);

    // Return response with application ID
    return NextResponse.json({
      success: true,
      message: aiResponse.message || "No response generated.",
      eligible: aiResponse.eligible ?? false,
      applicationId: `APP-${Date.now()}`,
    });
  } catch (error) {
    console.log("❌ Full Error Details:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process request.",
      },
      { status: 500 }
    );
  }
}
