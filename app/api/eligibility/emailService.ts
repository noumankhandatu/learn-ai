import nodemailer from "nodemailer";

const calendlyUrl = process.env.CALENDLY_URL;

export async function sendEmail(toEmail: string, fullName: string, eligible: boolean) {
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

    const firstName = fullName.split(" ")[0];

    let subject = "";
    let emailBody = "";
    console.log(eligible, "eligible");

    if (eligible) {
      subject = "You’re Qualified – Let’s Build Your AI Roadmap";
      emailBody = `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #0073e6;">Hi ${firstName},</h2>
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
</div>

      `;
    } else {
      subject = "Update on Your LEARN AI Coaching Application";
      emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #0073e6;">Hi ${firstName},</h2>
    <p>Thank you for applying to the <strong>LEARN AI Coaching Accelerator</strong>.</p>
    <p>After reviewing your responses, we’re unable to move forward with your application at this time. Our program is built to deliver high-impact outcomes for professionals who are fully prepared to take action and grow.</p>
    <p>To become eligible in the future, here are two areas we encourage you to strengthen:</p>
    <ul>
      <li><strong>Financial Readiness:</strong><br>Our program offers exceptional value and is designed for those who are ready to invest in their career growth. We welcome applicants who are financially secure enough to confidently participate without added stress.</li>
      <li><strong>Time & Presence Commitment:</strong><br>This is a professional-level coaching experience. We ask that all participants show up fully present, in a quiet, distraction-free space. This ensures we respect each other’s time and maintain the high standard of excellence our clients expect.</li>
    </ul>
    <p>We’re here to serve serious professionals—those ready to rise with AI, whether in a 9–5 role or entrepreneurial venture.</p>
    <p>When you’ve addressed the points above, you’re welcome to reapply. Please note: applications must remain fully honest. Dishonest submissions will be permanently disqualified from future opportunities.</p>
    <p>Wishing you clarity, growth, and success,</p>
    <p>Chinedu Ekukinam<br><strong>Founder & AI Coach</strong><br>info@learnai.one<br>https://learnai.one<br>(785) 226-2424</p>
  </div>
</div>

      `;
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
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// import nodemailer from "nodemailer";
// const calendlyUrl = process.env.CALENDLY_URL;

// export async function sendEmail(toEmail: string, subject: string, message: string, eligible: boolean) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "mail.privateemail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Add Calendly link if eligible
//     const calendlyLink = eligible
//       ? `<p style="font-size: 16px; color: #333;"><strong>Schedule your meeting here:</strong>
//         <a href="${calendlyUrl}"
//            style="color: #0073e6; text-decoration: none; font-weight: bold;">
//           Book a Meeting
//         </a>
//       </p>`
//       : "";

//     const emailBody = `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f8fb; padding: 20px; border-radius: 8px;">
//       <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
//         <h2 style="color: #0073e6; text-align: center;">LEARNAI Application Update</h2>
//         <p style="font-size: 16px; color: #333;">Hello 👋,</p>
//         <p style="font-size: 16px; color: #333;">${message}</p>
//         ${calendlyLink}
//         <p style="font-size: 14px; color: #666; text-align: center;">Best regards,<br><strong>LEARNAI Team</strong></p>
//       </div>
//     </div>
//     `;

//     // Send email
//     const info = await transporter.sendMail({
//       from: `"LEARNAI Team" <${process.env.EMAIL_USER}>`,
//       to: toEmail,
//       subject,
//       html: emailBody,
//     });

//     console.log(`✅ Email sent to ${toEmail} (${info.messageId}) ${eligible ? "with Calendly link" : ""}`);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
//   }
// }
