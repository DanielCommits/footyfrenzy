import React, { useEffect, useRef } from 'react';
import './RandomStats.css'; // Make sure to create this CSS file

const RandomStats = () => {
  const iframeRef1 = useRef(null);
  const iframeRef2 = useRef(null);

  useEffect(() => {
    const handleResize = (event) => {
      if (event.data.appHeight && event.data.inst === 'b3e9a') {
        const container = iframeRef1.current;
        if (container) {
          container.style.height = `${parseInt(event.data.appHeight, 10)}px`;
        }
      } else if (event.data.appHeight && event.data.inst === 'b1ece') {
        const container = iframeRef2.current;
        if (container) {
          container.style.height = `${parseInt(event.data.appHeight, 10)}px`;
        }
      }
    };

    window.addEventListener('message', handleResize);

    return () => {
      window.removeEventListener('message', handleResize);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="side-top-stories-text">Daily Random Stats</h2>
      <div className="random-stats-grid">
        <div
          id="scoreaxis-widget-b3e9a"
          className="random-stat-card"
        >
          <iframe
            ref={iframeRef1}
            id="Iframe"
            src="https://www.scoreaxis.com/widget/league-top-players/8?autoHeight=1&amp;bodyBackground=%23999999&amp;inst=b3e9a"
            style={{ width: '100%', border: 'none', transition: 'all 300ms ease' }}
          ></iframe>
        </div>

        <div
          id="scoreaxis-widget-b1ece"
          className="random-stat-card"
        >
          <iframe
            ref={iframeRef2}
            id="Iframe"
            src="https://www.scoreaxis.com/widget/team-info/18?autoHeight=1&amp;bodyBackground=%231119999&amp;inst=b1ece"
            style={{ width: '100%', border: 'none', transition: 'all 300ms ease' }}
          ></iframe>
        </div>

        
      </div>
    </div>
  );
};

export default RandomStats;
