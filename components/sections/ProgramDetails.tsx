export default function ProgramDetails() {
  const programComponents = [
    "Pre-recorded video lessons",
    "Live weekly coaching calls",
    "Active Slack community",
    "AI-enhanced learning tools",
    "Transformational templates",
    "Real-world projects",
  ];

  const programComponentss = [
    "Transformational learning experience not Transactional",
    "Slack based Community led by a Team of AI experts and Engineers providing value based approach",
    "Stand out from your peers at your corporate Jobs",
    "Guided approach to launch your very own AI Business to generate passive income",
    "Take your ideas from Ideation > Proof-of-Concept > Go to market",
    "AI Agents to enhance your learning experience",
    "Live Weekly AI Coaching Zoom calls",
  ];
  return (
    <div className="w-full  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl font-bold text-center text-[#1E88E5] mb-6">Program Details</h2>

        {/* Subtitle */}
        <h3 className="text-xl md:text-2xl font-medium text-center text-gray-700 mb-4">Our comprehensive AI Product Management curriculum</h3>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Program Components Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h4 className="text-2xl font-bold text-gray-800 mb-8">Program Components</h4>

          <ul className="space-y-6">
            {programComponents.map((component, index) => (
              <li key={index} className="flex items-start">
                <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
                <div className="text-gray-700 text-lg">{component}</div>
              </li>
            ))}
          </ul>
          <h4 className="text-2xl font-bold text-gray-800 mt-8 mb-8">Our Commitment</h4>

          <ul className="space-y-6">
            {programComponentss.map((component, index) => (
              <li key={index} className="flex items-start">
                <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
                <div className="text-gray-700 text-lg">{component}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
