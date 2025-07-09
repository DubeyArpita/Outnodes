import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6 sm:px-10 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
              Discover Amazing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Places to Explore
              </span>
            </h1>
            <p className="mt-4 text-gray-700 text-base md:text-lg font-medium">
              From hidden culinary gems to breathtaking natural wonders, find
              your next adventure with{" "}
              <span className="font-semibold text-blue-600">Outnodes</span>.
              <br className="hidden md:block" />
              <span className="text-purple-500">
                Join thousands of explorers discovering the world's best places.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/discover")}
                className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200"
              >
                Start Exploring
              </button>
              <button
                onClick={() => navigate("/submit-place")}
                className="px-6 py-3 text-blue-700 border-2 border-blue-600 rounded-lg bg-white hover:bg-blue-50 font-semibold shadow transition-all duration-200"
              >
                List Your Business
              </button>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-100">
            <img
              src="/home_page.png"
              alt="Outnodes hero visual"
              className="w-full h-full object-cover scale-105 brightness-95 hover:scale-110 hover:brightness-100 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-100/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Adventure <br />For Explorers
            </span>
          </h2>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto font-medium">
            Explore the categories below and dive into experiences that match
            your vibe. <br />
            Find trending places, serene spots, or hidden gems across your city.
            Favorites, categories, and curated themes await.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Food Outlets",
                image: "/food-outlets.jpg",
                description:
                  "Savor top-rated cafes, restaurants, and street eats.",
                link: "/discover/food",
              },
              {
                title: "Monuments & Nature",
                image: "/monuments-nature.jpg",
                description:
                  "Find peace in nature or explore historic landmarks.",
                link: "/discover/nature",
              },
              {
                title: "Clubs & Nightlife",
                image: "/clubs-nightlife.jpg",
                description:
                  "Experience vibrant nightlife and late-night hangouts.",
                link: "/discover/nightlife",
              },
              {
                title: "Gaming & Entertainment",
                image: "/gaming-entertainment.jpg",
                description:
                  "Unwind with arcades, gaming zones, and fun spaces.",
                link: "/discover/gaming",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(card.link)}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-blue-700">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-50 to-purple-100 text-center">
        <h2 className="text-3xl font-bold text-purple-700 drop-shadow">
          For Businesses
        </h2>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto font-medium">
          Have a café, venue, or experience to share? Get discovered by your
          ideal audience and grow with Outnodes.
        </p>
        <button
          onClick={() => navigate("/submit-place")}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow hover:from-purple-700 hover:to-blue-700 font-semibold transition-all duration-200"
        >
          List Your Place
        </button>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
            Ready to Start Your Adventure?
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100 mb-10 font-medium">
            Join thousands of explorers discovering amazing places or list your
            business to reach more customers. Your journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* "Enter location" styled as a button */}
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 border-2 border-blue-200">
              Enter Your Location
            </button>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/discover")}
              className="w-full sm:w-auto px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg flex items-center gap-2 hover:bg-purple-50 transition-all duration-200 border-2 border-purple-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.05 3.05a7 7 0 119.9 9.9 7 7 0 01-9.9-9.9zm3.95 12.9a8 8 0 111.9-1.9l5.38 5.37-1.42 1.42-5.37-5.38z" />
              </svg>
              Find Places Near You
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
