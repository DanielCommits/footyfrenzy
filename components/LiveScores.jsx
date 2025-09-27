import React, { useEffect } from "react";
import './Livescores.css';

function LiveScores() {
  useEffect(() => {
    // Dynamically load the external script for the LiveScores widget
    const script = document.createElement("script");
    script.src =
      "https://ls.soccersapi.com/widget/res/wo_w4224_65ce2998b0ad9/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <section className="livescores-section">
        <hr />
        <p>
          <span className="red-dot"></span>Live Soccer Scores, Fixtures &
          Results
        </p>
        <br />
        <div
          id="ls-widget"
          data-w="wo_w4224_65ce2998b0ad9"
          className="livescore-widget"
        ></div>
      </section>
    </div>
  );
}

export default LiveScores;
