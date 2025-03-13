import React, { useEffect } from "react";
import banner from "../assets/home_page.png"; // Ensure this image exists
import bg_vid from "../assets/bg_home.mp4"; 
import "../styles/home.css";

function Home() {
  // Remove body padding on Home Page
  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <div className="home-container">
      {/* Video Background */}
      <video autoPlay loop muted className="video-bg">
        <source src={bg_vid} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="content">
        <h1 className="welcome-text">
          Welcome to <span className="highlight">Outnodes</span> 🚀
        </h1>
        <p className="lead-text">Discover amazing places around you!</p>
        
        <img src={banner} className="banner-img" alt="Banner" />
        
        <div className="btn-container">
          <a href="/categories" className="btn btn-primary">Explore Now</a>
          <a href="/owner" className="btn btn-outline-primary">List Your Place</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
