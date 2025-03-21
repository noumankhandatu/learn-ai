export default function LearnAIAdvantage() {
  // Define an array of card data
  const cards = [
    {
      title: "Leaders vs. Followers",
      content: "Those with transformational AI Product Manager skills command salaries upwards of $200K+",
    },
    {
      title: "Growing Demand",
      content: "Companies continue to increase AI Product Management hiring with unmet demand",
    },
    {
      title: "Competitive Edge",
      content: "Early adopters who master these skills now maintain a persistent advantage",
    },
    {
      title: "Career Security",
      content: "Position yourself at the forefront of the AI revolution instead of being left behind",
    },
    {
      title: "First-Mover Benefit",
      content: "Those who delay will find themselves competing for entry-level positions while our graduates advance to leadership roles",
    },
  ];

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl font-bold text-center text-[#1E88E5] mb-6">The LEARN AI Advantage</h2>

        {/* Subtitle */}
        <h3 className="text-xl md:text-2xl font-medium text-center text-gray-700 mb-4">The AI Career Imperative</h3>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Introduction Text */}
        <p className="text-lg text-gray-800 max-w-4xl mx-auto mb-10 text-center ">
          The question isn't if AI will replace jobs—it's who will thrive in this new landscape:
        </p>

        {/* Two-column layout for cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map over the cards array to render each card */}
          {cards.map((card, index) => (
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
