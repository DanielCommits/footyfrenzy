import React, { useState, useEffect } from "react";
import './Livescores.css';

const LiveScores = () => {
  const [iframeSrc, setIframeSrc] = useState(
    "https://www.scorebat.com/embed/livescore/?token=MTY4ODgzXzE3MzQ2MzUzNzVfZmJiZjM1NTc5N2FiYWI0NTBjZTI2NTFmYzk4MmFmNmJlY2UxYjMyYQ=="
  );

  useEffect(() => {
    // Dynamically load the Scorebat script after the component mounts
    const script = document.createElement("script");
    script.src = "https://www.scorebat.com/embed/embed.js?v=arrv";
    script.async = true;
    script.id = "scorebat-jssdk";
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to handle clicking on a live score link
  const handleClickScore = (scoreToken) => {
    const newSrc = `https://www.scorebat.com/embed/livescore/?token=${scoreToken}`;
    setIframeSrc(newSrc); // Update iframe source based on score clicked
  };

  return (
    <div className="live-scores-container">
      <div style={{ width: "100%", height: "100vh" }}>
        <iframe
          src={iframeSrc}
          frameBorder="0"
          width="100%"
          height="100%"
          allowFullScreen
          style={{ width: "100%", height: "100vh", border: "none" }}
          title="Live Scores"
        />
      </div>
      <div className="score-list">
        <button onClick={() => handleClickScore("MTY4ODgzXzE3MzQ2MzUzNzVfZmJiZjM1NTc5N2FiYWI0NTBjZTI2NTFmYzk4MmFmNmJlY2UxYjMyYQ==")}>
          Score 1
        </button>
        <button onClick={() => handleClickScore("AnotherScoreTokenHere")}>
          Score 2
        </button>
        {/* Add more buttons or score links dynamically */}
      </div>
    </div>
  );
};

export default LiveScores;
