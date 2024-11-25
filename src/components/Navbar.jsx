import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">FootyFrenzy</div>
      <ul className="navbar-links">
        <li>LIVE SCORES</li>
        <li>NEWS</li>
        <li>TRANSFERS</li>
        <li>PREMIER LEAGUE</li>
        <li>LA LIGA</li>
        <li>CULTURE</li>
        <li>BETTING</li>
      </ul>
      <div className="navbar-login">
        <span>Log in</span>
        <i className="login-icon"></i>
      </div>
      <div
        className="navbar-menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {isMenuOpen && (
        <div className="sidebar" ref={sidebarRef}>
          <ul>
            <li>LIVE SCORES</li>
            <li>NEWS</li>
            <li>TRANSFERS</li>
            <li>PREMIER LEAGUE</li>
            <li>LA LIGA</li>
            <li>CULTURE</li>
            <li>BETTING</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
