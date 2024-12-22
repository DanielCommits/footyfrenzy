import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "./PremierLeague.css";
import "./Home.css"; // Optionally use a separate CSS file

const PremierLeague = () => {
  const [news, setNews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("news"); // Tracks the currently active tab

  // Handle window resizing
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((article) => article.tag === "Premier League"); // Filter by tag

      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
    });

    return () => unsubscribe();
  }, []);

  // Content for different tabs
  const renderContent = () => {
    if (activeTab === "news") {
      return (
        <>
          <div className="row mb-4">
            {news[0] && (
              <div className="col-md-8 mb-3">
                <Link to={`/article/${news[0].id}`} className="card-link">
                  <div className="card h-100">
                    <img
                      src={news[0].imageUrl}
                      className="card-img-top"
                      alt={news[0].title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{news[0].title}</h5>
                      <p className="card-text">{news[0].description}</p>
                      <button className="btn btn-primary">
                        Read Full Story
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="col-md-4 d-flex flex-column gap-3">
              {news.slice(1, 3).map((article) => (
                <Link
                  to={`/article/${article.id}`}
                  key={article.id}
                  className="card-link"
                >
                  <div
                    className={`card h-100 ${
                      windowWidth <= 768 ? "card-horizontal" : ""
                    }`}
                  >
                    <img
                      src={article.imageUrl}
                      className={`card-img ${
                        windowWidth <= 768 ? "card-img-left" : "card-img-top"
                      }`}
                      alt={article.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">{article.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="row">
            {news.slice(3).map((article) => (
              <div key={article.id} className="col-md-4 col-12 mb-3">
                <Link to={`/article/${article.id}`} className="card-link">
                  <div className="card h-100">
                    <img
                      src={article.imageUrl}
                      className="card-img-top"
                      alt={article.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">{article.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      );
    } else if (activeTab === "table") {
      return (
        <div>
          <div
            id="scoreaxis-widget-b7d04"
            style={{
              borderWidth: "1px",
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: "8px",
              padding: "10px",
              background: "rgb(255, 255, 255)",
              width: "100%",
              backgroundColor: "#000000",
            }}
          >
            <iframe
              id="Iframe"
              src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=0&amp;font=3&amp;fontSize=13&amp;bodyBackground=%23000000&amp;textColor=%23ffffff&amp;inst=b7d04"
              style={{
                width: "100%",
                height: "580px",
                border: "none",
                transition: "all 300ms ease",
              }}
              title="ScoreAxis Widget"
            ></iframe>
            <script>
              {`
                window.addEventListener("DOMContentLoaded", (event) => {
                  window.addEventListener("message", (event) => {
                    if (
                      event.data.appHeight &&
                      "b7d04" === event.data.inst
                    ) {
                      const container = document.querySelector(
                        "#scoreaxis-widget-b7d04 iframe"
                      );
                      if (container) {
                        container.style.height =
                          parseInt(event.data.appHeight) + "px";
                      }
                    }
                  });
                });
              `}
            </script>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              textAlign: "left",
            }}
          >
            Data provided by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.scoreaxis.com/"
            >
              Scoreaxis
            </a>
          </div>
        </div>
      );
    } else if (activeTab === "matches") {
      return <div>Fixtures Coming Soon, for now use LiveScore.</div>;
    } else if (activeTab === "top-players") {
      return (
        <div
          id="scoreaxis-widget-eb501"
          style={{
            borderWidth: "1px",
            borderColor: "rgba(0, 0, 0, 0.15)",
            borderStyle: "solid",
            borderRadius: "8px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#000000",
          }}
        >
          <iframe
            id="Iframe"
            src="https://www.scoreaxis.com/widget/league-top-players/8?autoHeight=0&font=3&playersNumber=10&bodyBackground=%23000000&textColor=%23ffffff&fontSize=12&inst=eb501"
            style={{
              width: "100%",
              height: "640px",
              border: "none",
              transition: "all 300ms ease",
            }}
            title="Top Players Widget"
          ></iframe>
          <script>
            {`
              window.addEventListener("DOMContentLoaded", (event) => {
                window.addEventListener("message", (event) => {
                  if (
                    event.data.appHeight &&
                    "eb501" === event.data.inst
                  ) {
                    const container = document.querySelector(
                      "#scoreaxis-widget-eb501 iframe"
                    );
                    if (container) {
                      container.style.height =
                        parseInt(event.data.appHeight) + "px";
                    }
                  }
                });
              });
            `}
          </script>
        </div>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="toptext">PREMIER LEAGUE</h1>
      <br />

      {/* Navigation Tabs */}
      <div className="tabs">
        {["news", "table", "matches", "top-players"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "news"
              ? "Latest News"
              : tab === "top-players"
                ? "Top Players"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <hr />

      {/* Render Content */}
      {renderContent()}
    </div>
  );
};

export default PremierLeague;
