import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LEARNAI.ONE | AI Learning Guide",
  description: "Find answers to common questions about AI training, machine learning courses, and expert-led coaching at LEARNAI.ONE.",
  alternates: {
    canonical: "https://learnai.one/privacypolicy",
  },
  openGraph: {
    title: "Privacy Policy - LEARNAI.ONE | AI Learning Guide",
    description: "Get all your AI learning questions answered. Explore AI training, machine learning courses, and coaching programs.",
    url: "https://learnai.one/LEARNAI.png",
    siteName: "LEARNAI.ONE",
    images: [
      {
        url: "https://learnai.one/LEARNAI.png",
        width: 1200,
        height: 630,
        alt: "LEARNAI.ONE Privacy Policy Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@learnaiai",
    title: "Privacy Policy - LEARNAI.ONE | AI Learning Guide",
    description: "Answers to your AI training and machine learning questions at LEARNAI.ONE.",
    images: ["https://learnai.one/LEARNAI.png"],
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">LearnAI Legal Policies</h2>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Privacy Policy Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
          <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">Privacy Policy</h3>
          <p className="text-gray-700">
            LearnAI is committed to protecting your privacy. We never sell, rent, or share your personal information with third parties. All collected
            data is used strictly for enrollment, internal communication, and improving your learning experience.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>Information such as your name, email, and payment details is securely stored and only accessible to authorized personnel.</li>
            <li>Your data is handled in accordance with applicable laws of the State of Nebraska, United States of America.</li>
            <li>Any unauthorized access, disclosure, or attempt to exploit our platform or user data will result in immediate legal action.</li>
          </ul>
          <p className="text-gray-700 mt-4">By using our platform, you agree to this Privacy Policy and our commitment to your confidentiality.</p>
        </div>

        {/* Terms of Service Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
          <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">Terms of Service</h3>
          <p className="text-gray-700">
            LearnAI is a registered business entity in the State of Nebraska, United States of America, and operates in accordance with all applicable
            Nebraska laws. By enrolling in our courses or accessing any of our services, you agree to the following legally binding terms:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>
              <strong>Intellectual Property & Proprietary Content:</strong> All course materials, methods, and strategies are proprietary to LearnAI.
              Unauthorized sharing, distribution, or reproduction is strictly prohibited.
            </li>
            <li>
              <strong>Payment & Refund Policy:</strong> All payments are final and non-refundable. In special cases, deferral to a future cohort may
              be granted at LearnAI's discretion.
            </li>
            <li>
              <strong>Payment Plans:</strong> LearnAI offers in-house payment plans with a maximum of 3 installments. Third-party financing is
              separate and LearnAI is not responsible for their terms.
            </li>
            <li>
              <strong>Code of Conduct:</strong> Unprofessional behavior, harassment, or threats will result in permanent dismissal from LearnAI
              programs.
            </li>
            <li>
              <strong>Dispute Policy:</strong> Frivolous disputes or chargebacks will result in termination of access and possible legal action.
            </li>
          </ul>
          <p className="text-gray-700 mt-4">By enrolling, you fully accept and agree to these terms.</p>
        </div>

        {/* Cookie Policy Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">Cookie Policy</h3>
          <p className="text-gray-700">LearnAI uses cookies to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>Improve your user experience</li>
            <li>Personalize content and remember user preferences</li>
            <li>Analyze web traffic and performance metrics</li>
          </ul>
          <p className="text-gray-700 mt-4">
            You can disable cookies in your browser settings, but some website features may be impacted. By continuing to use our website, you consent
            to the use of cookies in accordance with this policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
