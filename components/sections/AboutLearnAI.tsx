export default function AboutLearnAI() {
  return (
    <div className="w-full bg-[#F9FAFB] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Introduction Text */}
        <p className="text-1xl text-gray-800 max-w-4xl mx-auto mb-16 text-center">
          LEARN AI empowers professionals overwhelmed by AI's complexity to confidently master artificial intelligence through our innovative CLEAR
          Learning Methodology:
        </p>

        {/* CLEAR Methodology */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-16 gap-2 md:gap-0">
          {/* Connect */}
          <div className="flex flex-col items-center w-full md:w-1/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg">
              C
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#1E88E5] mb-3">Connect</h4>
            <p className="text-center text-gray-700 text-sm md:text-base px-2">Connect new concepts with your existing knowledge</p>
          </div>

          {/* Connector 1 */}
          <div className="hidden md:block w-12 h-0.5 bg-[#90CAF9]"></div>

          {/* Learn */}
          <div className="flex flex-col items-center w-full md:w-1/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg">
              L
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#1E88E5] mb-3">Learn</h4>
            <p className="text-center text-gray-700 text-sm md:text-base px-2">Learn practical AI skills through structured guidance</p>
          </div>

          {/* Connector 2 */}
          <div className="hidden md:block w-12 h-0.5 bg-[#90CAF9]"></div>

          {/* Evaluate */}
          <div className="flex flex-col items-center w-full md:w-1/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg">
              E
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#1E88E5] mb-3">Evaluate</h4>
            <p className="text-center text-gray-700 text-sm md:text-base px-2">Evaluate your understanding through hands-on exercises</p>
          </div>

          {/* Connector 3 */}
          <div className="hidden md:block w-12 h-0.5 bg-[#90CAF9]"></div>

          {/* Apply */}
          <div className="flex flex-col items-center w-full md:w-1/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg">
              A
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#1E88E5] mb-3">Apply</h4>
            <p className="text-center text-gray-700 text-sm md:text-base px-2">Apply your skills to real-world projects</p>
          </div>

          {/* Connector 4 */}
          <div className="hidden md:block w-12 h-0.5 bg-[#90CAF9]"></div>

          {/* Review */}
          <div className="flex flex-col items-center w-full md:w-1/5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1E88E5] flex items-center justify-center text-white font-bold text-4xl mb-4 shadow-lg">
              R
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-[#1E88E5] mb-3">Review</h4>
            <p className="text-center text-gray-700 text-sm md:text-base px-2">Review and refine your knowledge with expert feedback</p>
          </div>
        </div>

        {/* Conclusion */}
        <p className="text-lg text-center text-gray-800 max-w-4xl mx-auto">
          Our transformational (not transactional) approach simplifies complex AI concepts into actionable skills that elevate careers, businesses,
          and create new income opportunities.
        </p>
      </div>
    </div>
  );
}
