import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Food Outlets",
    description: "Find the best restaurants and cafés around you.",
    image: "/food.jpg",
    link: "/food",
  },
  {
    title: "Monuments & Nature",
    description: "Explore peaceful parks and historic landmarks.",
    image: "/monuments.jpg",
    link: "/monument-nature",
  },
  {
    title: "Clubs & Nightlife",
    description: "Discover exciting nightlife and party destinations.",
    image: "/club.jpg",
    link: "/club-nightlife",
  },
  {
    title: "Gaming & Entertainment",
    description: "Find arcades, escape rooms, and entertainment zones.",
    image: "/entertainment.jpg",
    link: "/gaming-entertainment",
  },
];

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">
          🌟 Discover by Category
        </h1>
        <p className="mt-2 text-gray-600">
          Choose a theme to explore places tailored to your vibe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="relative group h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => navigate(cat.link)}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-5">
              <h2 className="text-2xl font-bold">{cat.title}</h2>
              <p className="mt-2 text-sm">{cat.description}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-sm rounded shadow">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
