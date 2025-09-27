import React, { useState, useEffect, useRef } from "react";
import styles from "/components/header.module.css";
import { Link } from "react-router-dom";
import {
  FaFutbol,
  FaBars,
  FaSearch,
  FaToggleOn,
  FaAddressCard,
  FaHouseUser,
} from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar when a link is clicked
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get the saved dark mode state from localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true"; // Convert saved value to boolean
  });

  const changeColor = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the new mode to localStorage
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadSearchWidget = () => {
      const script = document.createElement("script");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjBiYWU0MzMyY2ZkMWIzOTFjNTk5NCIsInRva2VuVHlwZSI6InB1YmxpYyIsImlhdCI6MTcyNjAzNzAwOSwiZXhwIjoxNDM0MDQzNzAwOX0.uRIfNAEK_Gaq4dljlQucweSpiBjSMVc4UX4pODByRLY";
      const lang = navigator.language || navigator.userLanguage;

      script.type = "text/javascript";
      script.async = true;
      script.src = `https://api.searchbar.org/v1/widget/${token}/${lang}`;

      script.onload = () => {
        console.log("Search widget loaded successfully");
      };

      // Insert the script before the first script tag
      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }

      // Cleanup function to remove the script when the component unmounts
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    // Call the function to load the search widget
    loadSearchWidget();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <header>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="d-flex align-items-center">
            <FaFutbol className="me-2" size={24} />
            <div className={styles.sitename}>Frenzyball</div>
          </Link>

          <nav className="nav-list d-none d-md-block">
            <ul className="nav" style={{ display: "flex", gap: "20px" }}>
              <li className="nav-item">
                <Link to="/" className={styles.customnavlink}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={styles.customnavlink}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/livescore" className={styles.customnavlink}>
                  LiveScores
                </Link>
              </li>
            </ul>
          </nav>

          <div className="specialNav d-flex align-items-center">
            <FaToggleOn size={24} className="me-3" onClick={changeColor} />
            <div id="sb-search-example" className="me-3">
              <div className="sb-search-icon" id="myCustomSearchButtonID">
                <FaSearch size={24} />
              </div>
            </div>
            <div className="menu-btn d-md-none" onClick={toggleSidebar}>
              <FaBars size={24} />
            </div>
          </div>
        </div>

        <div
          ref={sidebarRef}
          className={`${styles.sidebar} d-md-none ${
            isSidebarOpen ? styles.open : ""
          }`}
          id="sidebar"
        >
          <Link
            onClick={closeSidebar}
            to="/"
            className="d-flex align-items-center"
          >
            <FaFutbol className="me-2" size={24} />
            <div className={styles.sitename}>Frenzyball</div>
          </Link>

          <ul className="list-unstyled">
            <li onClick={closeSidebar}>
              <Link to="/" className="d-flex align-items-center">
                <FaHouseUser className="me-2" size={20} /> Home
              </Link>
            </li>
            <li onClick={closeSidebar}>
              <Link to="/contact" className="d-flex align-items-center">
                <FaAddressCard className="me-2" size={20} /> Contact
              </Link>
            </li>
            <li onClick={closeSidebar}>
              <Link to="/livescore" className="d-flex align-items-center">
                <FaCircleDot className="me-2" size={20} /> LiveScores
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
