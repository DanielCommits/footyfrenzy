import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">GOAL</div>
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
    </nav>
  );
};

export default Navbar;
