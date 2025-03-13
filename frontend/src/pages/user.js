import React, { useState } from "react";
import SearchBar from "../components/searchbar";
import PlaceCard from "../components/placecard";

const dummyPlaces = [
  { name: "City Park", category: "Garden", location: "Downtown", image: "https://source.unsplash.com/300x200/?park" },
  { name: "Sunset Café", category: "Food", location: "Uptown", image: "https://source.unsplash.com/300x200/?restaurant" }
];

function UserDashboard() {
  const [places, setPlaces] = useState(dummyPlaces);

  return (
    <div className="container mt-5">
      <h1 className="text-primary">User Dashboard</h1>
      <SearchBar />
      <div className="row">
        {places.map((place, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <PlaceCard {...place} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
