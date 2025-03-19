import React, { useState } from "react";
import SearchBar_Outlet from "../components/SearchBar_Outlet";
import SortingOptions from "../components/SortingOptions";
import Filters from "../components/Filters";
import OutletCard from "../components/OutletCard";
import OutletDetails from "../components/OutletDetails";
import "../styles/foodOutlets.css";

function FoodOutlets() {
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  // Dummy data for outlets
  const outlets = [
    {
      id: 1,
      name: "Cafe Mocha",
      rating: 2.5,
      location: "Downtown",
      cuisine: "Italian",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Spicy Treats",
      rating: 4.0,
      location: "Uptown",
      cuisine: "Indian",
      thumbnail: "https://via.placeholder.com/150",
    },
    // Add more outlets here...
  ];

  // Handle outlet click to show details
  const handleOutletClick = (outlet) => {
    setSelectedOutlet(outlet);
  };

  return (
    <div className="food-outlets-page">
      <h1>Explore Food Outlets</h1>

      {/* Search Bar */}
      <SearchBar_Outlet />

      {/* Sorting and Filters */}
      <div className="filters-sorting">
        <SortingOptions />
        <Filters />
      </div>

      {/* Outlet Cards */}
      <div className="outlet-cards">
        {outlets.map((outlet) => (
          <OutletCard key={outlet.id} outlet={outlet} onClick={() => handleOutletClick(outlet)} />
        ))}
      </div>

      {/* Detailed View */}
      {selectedOutlet && <OutletDetails outlet={selectedOutlet} />}
    </div>
  );
}

export default FoodOutlets;
