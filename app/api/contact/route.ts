import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendEmail(toEmail: string, subject: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailBody = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f8fb; padding: 30px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(90deg, #0073e6, #005bb5); padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;">New Contact Form Submission</h1>
          </div>
          <!-- Body -->
          <div style="padding: 30px;">
            <p style="font-size: 18px; color: #333333; margin: 0 0 10px;">Hello 👋,</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.6; margin: 0 0 20px;">
              You’ve received a new message from the LEARNAI contact form:
            </p>
            <div style="background: #f9fafb; border-left: 4px solid #f28c38; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <!-- Footer -->
          <div style="background: #f4f8fb; padding: 20px; text-align: center; border-top: 1px solid #e0e6ed;">
            <p style="font-size: 14px; color: #666666; margin: 0 0 5px;">
              Best regards,
            </p>
            <p style="font-size: 16px; color: #0073e6; font-weight: 600; margin: 0;">
              LEARNAI Team
            </p>
            <p style="font-size: 12px; color: #999999; margin: 10px 0 0;">
              <a href="https://yourwebsite.com" style="color: #f28c38; text-decoration: none;">Visit our website</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"LEARNAI Contact" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      html: emailBody,
    });

    console.log(`✅ Email sent to ${toEmail} (${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const subject = `New Contact Form Submission from ${firstName} ${lastName}`;
    const emailMessage = `
      Name: ${firstName} ${lastName}<br>
      Email: ${email}<br>
      Message: ${message}
    `;

    const result = await sendEmail(
      "noumankhan619.915@gmail.com", // Replace with your email
      subject,
      emailMessage
    );

    if (result.success) {
      return NextResponse.json({ message: "Email sent successfully", messageId: result.messageId }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
