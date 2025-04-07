import nodemailer from "nodemailer";
const calendlyUrl = process.env.CALENDLY_URL;

export async function sendEmail(toEmail: string, subject: string, message: string, eligible: boolean) {
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

    // Add Calendly link if eligible
    const calendlyLink = eligible
      ? `<p style="font-size: 16px; color: #333;"><strong>Schedule your meeting here:</strong> 
        <a href="${calendlyUrl}" 
           style="color: #0073e6; text-decoration: none; font-weight: bold;">
          Book a Meeting
        </a>
      </p>`
      : "";

    const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #0073e6; text-align: center;">LEARNAI Application Update</h2>
        <p style="font-size: 16px; color: #333;">Hello 👋,</p>
        <p style="font-size: 16px; color: #333;">${message}</p>
        ${calendlyLink}
        <p style="font-size: 14px; color: #666; text-align: center;">Best regards,<br><strong>LEARNAI Team</strong></p>
      </div>
    </div>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"LEARNAI Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      html: emailBody,
    });

    console.log(`✅ Email sent to ${toEmail} (${info.messageId}) ${eligible ? "with Calendly link" : ""}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
