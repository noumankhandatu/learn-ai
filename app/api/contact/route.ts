import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendEmail(toEmail: string, subject: string, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f8fb; padding: 30px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(90deg, #0073e6, #005bb5); padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 18px; color: #333;">Hello 👋,</p>
            <p style="font-size: 16px; color: #555;">You’ve received a new message:</p>
            <div style="background: #f9fafb; border-left: 4px solid #f28c38; padding: 15px; border-radius: 8px;">
              <p style="margin: 0; font-size: 16px; color: #333;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <div style="background: #f4f8fb; padding: 20px; text-align: center; border-top: 1px solid #e0e6ed;">
            <p style="font-size: 14px; color: #666;">Best regards,</p>
            <p style="font-size: 16px; color: #0073e6; font-weight: 600;">LEARNAI Team</p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"LEARNAI Team" <${process.env.EMAIL_USER}>`,
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

    if (!process.env.RECEIVER_EMAIL) {
      return NextResponse.json({ error: "Receiver email is not configured" }, { status: 500 });
    }
    const result = await sendEmail(process.env.RECEIVER_EMAIL, subject, emailMessage);

    if (result.success) {
      return NextResponse.json({ message: "Email sent successfully", messageId: result.messageId }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
