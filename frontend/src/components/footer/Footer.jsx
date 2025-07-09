import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-8 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-blue-400">
            Outnodes
          </h2>
          <p className="mt-3 text-sm text-gray-300">
            Discover hidden gems, cool hangouts, and unforgettable experiences
            around you. Your next favorite spot is just a click away.
          </p>
        </div>

        {/* Explorer Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">For Explorers</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>
              <Link to="/discover" className="hover:text-white">
                Browse Places
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-white">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/themes" className="hover:text-white">
                Explore by Theme
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">For Businesses</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>
              <Link to="/submit-place" className="hover:text-white">
                List Your Place
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white">
                Your Dashboard
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white">
                Pricing & Plans
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Socials & Footer Note */}
      <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Outnodes. Built with ❤️ for local
          adventurers.
        </p>
        <div className="flex gap-4 text-lg">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
