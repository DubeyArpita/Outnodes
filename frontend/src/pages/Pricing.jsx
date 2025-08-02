import React from "react";

const pricingPlans = [
  {
    name: "Free",
    price: "₹0/month",
    description: "Ideal for newcomers who want to explore without commitment.",
    features: [
      "List up to 2 places",
      "Basic visibility in search results",
      "Standard listing design",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹799/month",
    description: "For businesses ready to scale their reach and showcase more.",
    features: [
      "List up to 10 places",
      "Carousel image support",
      "Priority appearance in search",
      "Performance analytics dashboard",
    ],
    highlight: true,
  },
  {
    name: "Elite",
    price: "₹1999/month",
    description: "For brands seeking maximum exposure and premium tools.",
    features: [
      "Unlimited listings",
      "Featured placement on homepage",
      "Geo-targeted campaign boosts",
      "Seasonal promotional access",
      "Verified badge included",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="relative min-h-screen">
      {/* Section vibrant gradient background, not fixed, so footer is visible */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16 z-10">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-4 drop-shadow-lg">
          Choose Your Plan
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Whether you're just starting out or scaling across the city,{" "}
          <span className="font-semibold text-indigo-600">Outnodes </span> has a
          plan to match your business ambition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 bg-white/90 backdrop-blur-md overflow-hidden group
              ${
                plan.highlight
                  ? "border-indigo-600 scale-105 shadow-indigo-200 z-10 min-h-[520px] md:min-h-[540px] pt-10"
                  : "border-gray-200"
              }
            `}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-xs px-4 py-1 rounded-b-xl font-bold shadow-md animate-pulse">
                  Most Popular
                </div>
              )}
              <h2 className="text-3xl font-bold text-indigo-700 mb-2 group-hover:text-pink-600 transition-all">
                {plan.name}
              </h2>
              <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-4">
                {plan.price}
              </p>
              <p className="text-gray-600 mb-6 text-base font-medium">
                {plan.description}
              </p>

              <ul className="space-y-3 text-base text-gray-800 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 to-pink-400 shadow-md" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-4 w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all duration-200
                ${
                  plan.highlight
                    ? "bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white"
                    : "bg-slate-700 hover:bg-slate-800 text-white"
                }
              `}
              >
                {plan.name === "Free"
                  ? "Start Listing"
                  : "Upgrade to " + plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
