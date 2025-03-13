import React, { useState } from "react";

const dummyPlaces = [
  { id: 1, name: "Sunset Café", category: "Food", location: "Uptown" }
];

function OwnerDashboard() {
  const [places, setPlaces] = useState(dummyPlaces);
  const [newPlace, setNewPlace] = useState({ name: "", category: "", location: "" });

  // Add a new place
  const handleAddPlace = () => {
    if (newPlace.name && newPlace.category && newPlace.location) {
      setPlaces([...places, { id: places.length + 1, ...newPlace }]);
      setNewPlace({ name: "", category: "", location: "" });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Owner Dashboard</h1>

      {/* Add Place Form */}
      <div className="card p-3 mb-4 shadow-lg">
        <h5 className="fw-bold">Add New Place</h5>
        <input type="text" className="form-control mb-2" placeholder="Name" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Category" value={newPlace.category} onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })} />
        <input type="text" className="form-control mb-2" placeholder="Location" value={newPlace.location} onChange={(e) => setNewPlace({ ...newPlace, location: e.target.value })} />
        <button className="btn btn-primary w-100" onClick={handleAddPlace}>Add Place</button>
      </div>

      {/* Owner's Listed Places */}
      <div className="row">
        {places.map((place) => (
          <div className="col-md-4 mb-4" key={place.id}>
            <div className="card p-3 shadow-sm">
              <h5>{place.name}</h5>
              <p><strong>Category:</strong> {place.category}</p>
              <p><strong>Location:</strong> {place.location}</p>
              <button className="btn btn-warning btn-sm me-2">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerDashboard;
