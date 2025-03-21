export default function WhatSetsLearnAIApart() {
  const comparisonData = [
    { traditional: "Information overload", learnAI: "Transformational learning" },
    { traditional: "Technical complexity", learnAI: "Simplified concepts" },
    { traditional: "Generic content", learnAI: "Personalized pathways" },
    { traditional: "Limited support", learnAI: "Community of experts" },
    { traditional: "Certificate only", learnAI: "Career transformation" },
    { traditional: "Job-focused only", learnAI: "Passive income opportunities" },
  ];

  return (
    <div className="w-full bg-[#F9FAFB] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl font-bold text-center text-[#1E88E5] mb-6">What Sets LEARN AI Apart</h2>

        {/* Subtitle */}
        <h3 className="text-xl md:text-2xl font-medium text-center text-gray-700 mb-4">Information vs. Transformation: The LEARN AI Difference</h3>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg shadow-md">
          {/* Table Headers */}
          <div className="grid grid-cols-2 bg-[#1E88E5] text-white">
            <div className="p-4 md:p-6 text-center font-bold text-lg md:text-xl">Traditional AI Courses</div>
            <div className="p-4 md:p-6 text-center font-bold text-lg md:text-xl">LEARN AI Program</div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((item, index) => (
            <div key={index} className={`grid grid-cols-2 border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
              <div className="p-4 md:p-6 text-center">{item.traditional}</div>
              <div className="p-4 md:p-6 text-center">{item.learnAI}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
