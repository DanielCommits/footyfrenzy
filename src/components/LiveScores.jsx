import React, { useEffect } from "react";

const LiveScoresWidget = () => {
  useEffect(() => {
    // Create a script element to dynamically load the widget
    const script = document.createElement("script");
    script.src = "https://ls.soccersapi.com/widget/res/wo_w4224_65ce2998b0ad9/widget.js";
    script.type = "text/javascript";
    script.async = true;

    // Append script to the body
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
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
