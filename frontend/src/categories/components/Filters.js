import React from "react";

function Filters() {
  return (
    <div className="filters">
      <label>
        Veg/Non-Veg:
        <select>
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </label>

      <label>
        Cuisine:
        <select>
          <option value="all">All</option>
          <option value="italian">Italian</option>
          <option value="indian">Indian</option>
          {/* Add more cuisines */}
        </select>
      </label>
    </div>
  );
}

export default Filters;
