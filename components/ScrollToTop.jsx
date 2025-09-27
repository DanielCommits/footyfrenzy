import React, { useState, useEffect } from "react";
import "/components/ScrollToTop.css"; // Make sure to create this CSS file for styling
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      // Show button after scrolling 300px
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowAltCircleUp  />
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;
