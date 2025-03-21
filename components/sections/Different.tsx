export default function Different() {
  // Define an array of card data
  const features = [
    {
      title: "Transformation-Focused",
      content: "While others overwhelm you with information, we focus on transforming how you understand and apply AI concepts",
    },
    {
      title: "CLEAR Framework",
      content: "Our proprietary learning methodology simplifies complex AI concepts into intuitive, actionable knowledge",
    },
    {
      title: "Comprehensive Support",
      content: "Evergreen course content, live Slack community, and weekly Zoom coaching calls provide multi-level support",
    },
    {
      title: "Ready-to-Use Tools",
      content: "Our transformational templates accelerate your journey to becoming a high-impact AI Product Manager",
    },
    {
      title: "Flexible Career Paths",
      content: "Whether you're new to the field or an experienced Product Manager, our framework adapts to your starting point",
    },
    {
      title: "Beyond Employment",
      content: "Unique roadmaps for generating passive income through AI freelancing or launching your own AI agency",
    },
  ];

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}

        {/* Introduction Text */}
        <p className=" text-gray-800 max-w-4xl mx-auto mb-10 text-4xl text-center ">Why We're Different</p>

        {/* Two-column layout for cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map over the cards array to render each card */}
          {features.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex">
              <div className="w-2 bg-[#1E88E5]"></div>
              <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <h4 className="text-2xl font-bold text-[#1E88E5] mt-2">{card.title}</h4>
                </div>
                <p className="text-gray-700">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
