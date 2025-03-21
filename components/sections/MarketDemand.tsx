import Image from "next/image";

export default function MarketDemandSection() {
  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-4xl font-bold text-center text-[#1E88E5] mb-6">Market Demand & Earning Potential</h2>

        {/* Description */}
        <p className="text-lg text-center text-gray-700 max-w-4xl mx-auto mb-6">
          The demand for AI Product Managers is soaring as companies across industries integrate AI into their products and services
        </p>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-1 bg-[#1E88E5] rounded"></div>
        </div>

        {/* Salary Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <ul className="space-y-6">
            {/* Salary Points */}
            <li className="flex items-start">
              <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
              <div>
                <span className="text-[#1E88E5] font-medium">Average AI Product Manager Salary:</span> $160,000
              </div>
            </li>

            <li className="flex items-start">
              <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
              <div>
                <span className="text-[#1E88E5] font-medium">Senior AI Product Manager Salary:</span> $199,000+
              </div>
            </li>

            <li className="flex items-start">
              <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
              <div>
                <span className="text-[#1E88E5] font-medium">Top-Tier Companies:</span> Netflix AI Product Managers earn up to $250,000 base salary
                plus stock options
              </div>
            </li>

            <li className="flex items-start">
              <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
              <div>
                <span className="text-[#1E88E5] font-medium">Additional Compensation:</span> Stock options, bonuses, and benefits often add 20-30%
                more value
              </div>
            </li>

            <li className="flex items-start">
              <div className="text-[#1E88E5] text-3xl mr-4 leading-none">•</div>
              <div>
                <span className="text-[#1E88E5] font-medium">Freelance Opportunities:</span> $120-200 per hour consulting rates
              </div>
            </li>
          </ul>

          {/* Source Note */}
          <div className="bg-white mt-10 rounded-lg shadow-lg overflow-hidden flex">
            <div className="w-2 bg-[#1E88E5]"></div>
            <div className="p-6 flex-1">
              <div className="flex items-start gap-4 mb-4">
                <h4 className=" mt-2">
                  {" "}
                  Source: According to Glassdoor and Indeed salary data from Q2 2024, AI Product Managers are among the top 10 fastest-growing tech
                  roles with a projected growth rate of 37% through 2030. Companies like Google, Netflix, Amazon, and Microsoft consistently offer
                  top-tier compensation packages to secure AI Product Management talent.
                </h4>
                {/* <div className="flex justify-end mt-4">
                  <Image src="/placeholder.svg?height=30&width=120" alt="Glassdoor Data" width={120} height={30} className="opacity-80" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
