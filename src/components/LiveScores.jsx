import React, { useEffect, useState } from "react";

const LiveScoresWidget = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a script element to dynamically load the widget
    const script = document.createElement("script");
    script.src = "https://ls.soccersapi.com/widget/res/wo_w4224_65ce2998b0ad9/widget.js";
    script.type = "text/javascript";
    script.async = true;

    // When the widget script loads, wait for the widget to render, then hide loader
    script.onload = () => {
      // Wait for widget to render (may need a short delay)
      setTimeout(() => setLoading(false), 10000);
    };

    document.body.appendChild(script);

    // Fallback: hide loader after 3s if widget doesn't fire
    const fallback = setTimeout(() => setLoading(false), 10000);

    return () => {
      document.body.removeChild(script);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(35,39,47,0.95)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div
            className="spinner-border text-light"
            role="status"
            style={{
              width: "2.2rem",
              height: "2.2rem",
              borderWidth: "0.3em"
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <span style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.2rem",
            marginTop: "18px",
            letterSpacing: "0.03em"
          }}>
            Loading live scores...
          </span>
        </div>
      )}
      {/* Livescore widget container */}
      <div
        id="ls-widget"
        data-w="wo_w4224_65ce2998b0ad9"
        className="livescore-widget"
      ></div>
    </div>
  );
};

export default LiveScoresWidget;
