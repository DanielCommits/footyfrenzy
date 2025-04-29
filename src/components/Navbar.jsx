import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaSun, FaMoon, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const menuRef = useRef(null);

  const defaultNotifications = [
    { id: 3, message: "Back from a 4-month Hiatus!", read: false },
    { id: 2, message: "Join our socials, just scroll to the footer", read: false },
    { id: 1, message: "Help in sharing the site please.", read: false },
    // You can keep adding new messages here with unique IDs
  ];

  const [notifications, setNotifications] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];

    const merged = defaultNotifications.map((def) => {
      const existing = stored.find((s) => s.id === def.id);
      return existing ? { ...def, read: existing.read } : def;
    });

    const extra = stored.filter(
      (s) => !defaultNotifications.some((d) => d.id === s.id)
    );

    return [...merged, ...extra];
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  useEffect(() => {
    if (showNotifModal) {
      const timer = setTimeout(() => {
        setShowNotifModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotifModal]);

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
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

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

  return (
    <nav className="navbar" ref={menuRef}>
      <Link to="/" className="navbar-logo">
        FootyFrenzy
      </Link>
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li><Link to="/livescores">LIVESCORES</Link></li>
        <li><Link to="/transfers">TRANSFERS</Link></li>
        <li><Link to="/premier-league">PREMIER LEAGUE</Link></li>
        <li><Link to="/la-liga">LA-LIGA</Link></li>
        <li><Link to="/betting">BETTING</Link></li>
      </ul>

      <div className="navbar-right">
        <div
          className="navbar-notification"
          onClick={() => setShowNotifModal(!showNotifModal)}
        >
          <FaBell size={24} />
          {unreadCount > 0 && (
            <span className="notif-badge">{unreadCount}</span>
          )}
        </div>

        {showNotifModal && (
          <div className="notif-modal fade-in">
            <h4>Notifications</h4>
            <ul>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`notif-item ${notif.read ? "read" : "unread"}`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
            <button className="mark-read-btn" onClick={markAllAsRead}>
              ✔ Mark all as read
            </button>
          </div>
        )}

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
