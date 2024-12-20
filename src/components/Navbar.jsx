import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state
  const menuRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }

    const toggleTheme = () => {
      document.body.classList.toggle("dark-mode");
      const currentTheme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("theme", currentTheme);
    };

    const themeToggleButton = document.querySelector(".theme-toggle");
    if (themeToggleButton) {
      themeToggleButton.addEventListener("click", toggleTheme);
    }

    return () => {
      if (themeToggleButton) {
        themeToggleButton.removeEventListener("click", toggleTheme);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    console.log("Dark Mode:", isDarkMode ? "On" : "Off");
  }, [isDarkMode]);

  return (
    <nav className="navbar" ref={menuRef}>
      <Link to="/" className="navbar-logo">
        FootyFrenzy
      </Link>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link to="/livescores">LIVESCORES</Link>
        </li>
        <li>TRANSFERS</li>
        <li>PREMIER LEAGUE</li>
        <li>LA LIGA</li>
        <li>BETTING</li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-login">
          <FaUserCircle size={24} />
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
        <div
          className="navbar-menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
