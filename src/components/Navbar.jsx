import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

  // Toggle dark mode and apply/remove the class on body
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode"); // Apply dark mode styles
    } else {
      document.body.classList.remove("dark-mode"); // Remove dark mode styles
    }
  };

  useEffect(() => {
    // Log the current theme state (dark/light)
    console.log("Dark Mode:", isDarkMode ? "On" : "Off");
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">FootyFrenzy</div>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>LIVE SCORES</li>
        <li>NEWS</li>
        <li>TRANSFERS</li>
        <li>PREMIER LEAGUE</li>
        <li>LA LIGA</li>
        <li>CULTURE</li>
        <li>BETTING</li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-login">
        <FaRegUserCircle size={20} />
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaMoon size={24} /> : <FaSun size={24} />}{" "}
          {/* Show moon for dark mode, sun for light mode */}
        </button>
        <div
          className="navbar-menu-icon"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
