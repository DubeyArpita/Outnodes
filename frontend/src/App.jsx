import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(
          loginUser({
            user: parsedUser,
            role,
            token,
          })
        );
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-sky-50">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
