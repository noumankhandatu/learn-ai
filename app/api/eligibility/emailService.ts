import nodemailer from "nodemailer";

const calendlyUrl = process.env.CALENDLY_URL;
const receiverEmail = process.env.RECEIVER_EMAIL;

export async function sendEmail(toEmail: string, firstName: string, lastName: string, phoneNumber: string, eligible: boolean) {
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

    let subject = "";
    let emailBody = "";

    const userDetailsHTML = `
      <div style="margin-bottom: 20px; padding: 10px; background: #eef3f8; border-radius: 6px;">
        <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Email Address:</strong> ${toEmail}</p>
      </div>
    `;

    if (eligible) {
      subject = "You’re Qualified – Let’s Build Your AI Roadmap";
      emailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0073e6;">Hi ${firstName} ${lastName},</h2>
            <p>Congratulations — your application for the <strong>LEARN AI Coaching Accelerator</strong> has been <strong>Approved</strong>!</p>
            <p>You’re taking control of your future while others stay stuck:</p>
            <ul>
              <li>• Feeling overwhelmed by AI advancements</li>
              <li>• Stalled in promotions or leadership growth</li>
              <li>• Missing out on new income opportunities</li>
            </ul>
            <p>At LEARN AI, we help 9–5 professionals and aspiring entrepreneurs:</p>
            <ul>
              <li>• Use AI (without coding) to gain visibility, earn recognition, and build innovative products</li>
              <li>• Launch monetizable skills and AI-powered side hustles</li>
              <li>• Develop a confident, personalized roadmap with expert mentorship</li>
            </ul>
            <p><strong>Next Step:</strong> Book your LEARN AI Roadmap Call to finalize your strategy:</p>
            <p><a href="${calendlyUrl}" style="background: #0073e6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">📅 Book a Meeting</a></p>
            <p>This is your moment — don’t let it pass you by.</p>
            <p>We can’t wait to help you build what’s next.</p>
            <p>With purpose,<br>Chinedu Ekukinam<br><strong>Founder & AI Coach, LEARN AI</strong><br>info@learnai.one<br>https://learnai.one<br>(785) 226-2424</p>
          </div>
        </div>`;

      // Send second email to receiver with applicant details
      await transporter.sendMail({
        from: `"LEARNAI Team" <${process.env.EMAIL_USER}>`,
        to: receiverEmail,
        subject: `New Approved Applicant: ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f8fb;">
            <h3>New Qualified Applicant Details</h3>
            ${userDetailsHTML}
          </div>
        `,
      });
    } else {
      subject = "Update on Your LEARN AI Coaching Application";
      emailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0073e6;">Hi ${firstName} ${lastName},</h2>
            <p>Thank you for applying to the <strong>LEARN AI Coaching Accelerator</strong>.</p>
            <p>After reviewing your responses, we’re unable to move forward with your application at this time.</p>
            <p>To become eligible in the future, here are two areas we encourage you to strengthen:</p>
            <ul>
              <li><strong>Financial Readiness:</strong><br>Our program offers exceptional value and is designed for those who are ready to invest in their career growth.</li>
              <li><strong>Time & Presence Commitment:</strong><br>This is a professional-level coaching experience. We ask that all participants show up fully present.</li>
            </ul>
            <p>Wishing you clarity, growth, and success,</p>
            <p>Chinedu Ekukinam<br><strong>Founder & AI Coach</strong><br>info@learnai.one<br>https://learnai.one<br>(785) 226-2424</p>
          </div>
        </div>`;
    }

    const info = await transporter.sendMail({
      from: `"LEARNAI Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      html: emailBody,
    });

    console.log(`✅ Email sent to ${toEmail} (${info.messageId}) - ${eligible ? "Approved" : "Rejected"}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
