import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  console.log("🧪 Dashboard token:", token);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/business/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        console.log("📦 Stats response:", result);

        // 🔄 Update both name and stats
        setStats({
          name: result.name,
          ...result.stats,
        });
      } catch (err) {
        console.error("❌ Failed to fetch dashboard stats:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <div className="p-10 text-gray-600">Loading dashboard...</div>;

  if (!stats)
    return <div className="p-10 text-red-600">Failed to load stats.</div>;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Welcome, {stats.name} 👋
        </h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Places Posted",
              value: stats.placesPosted,
              color: "bg-blue-600",
            },
            {
              label: "Views This Month",
              value: stats.viewsThisMonth,
              color: "bg-purple-600",
            },
            {
              label: "Avg. Rating",
              value: stats.rating,
              color: "bg-yellow-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`${stat.color} text-white p-6 rounded-lg shadow-md`}
            >
              <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              <h2 className="text-3xl font-semibold mt-2">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              My Places
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              View, edit or delete your listed experiences.
            </p>
            <button
              onClick={() => navigate("/your-places")}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Manage Listings
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add a New Place
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Share a new gem with the community and get discovered.
            </p>
            <button
              onClick={() => navigate("/submit-place")}
              className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Submit New
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
