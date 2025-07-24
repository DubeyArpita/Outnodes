import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user, role } = useSelector((state) => state.user);
  
  return (
    <section className="min-h-screen bg-gray-100 px-6 py-16 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <img
            src={user?.profilePic || "/default-avatar.jpg"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500"
          />
        </div>

        <div className="text-left space-y-4">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <h2 className="text-lg font-semibold">{user?.name || "Unnamed"}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <h2 className="text-lg font-semibold">
              {user?.email || "No email"}
            </h2>
          </div>

          {role === "business" && (
            <>
              <div>
                <p className="text-sm text-gray-500">Business Phone</p>
                <h2 className="text-lg font-semibold">
                  {user?.businessPhone || "N/A"}
                </h2>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <h2 className="text-lg font-semibold">
                  {user?.location || "Not set"}
                </h2>
              </div>
              <div>
                <p className="text-sm text-gray-500">Business Description</p>
                <h2 className="text-lg font-semibold">
                  {user?.businessDesc || "No description provided."}
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
