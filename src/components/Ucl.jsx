import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "./PremierLeague.css";

const Ucl = () => {
  const [news, setNews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("news");

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (article) =>
            article.title.toLowerCase().includes("ucl") ||
            article.description
              .toLowerCase()
              .includes("uefa champions league") ||
            (article.content && article.content.toLowerCase().includes("ucl"))
        );

      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
    });

    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    if (activeTab === "news") {
      return (
        <>
          {/* Ad container above the news */}
          <div
            style={{
              width: 320,
              height: 50,
              margin: "0 auto 24px auto",
              textAlign: "center",
            }}
          >
            <div id="container-3a9cfe4e5c7829b05fa6c39f45408eed"></div>
          </div>
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
            id="scoreaxis-widget-7c035"
            style={{
              borderWidth: "1px",
              borderColor: "rgba(0, 0, 0, 0.15)",
              borderStyle: "solid",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#000000",
              width: "100%",
            }}
          >
            <iframe
              id="Iframe"
              src="https://www.scoreaxis.com/widget/standings-widget/2?autoHeight=0&groupNum=undefined&fontSize=&bodyBackground=%23000000&textColor=%23ffffff&inst=7c035"
              style={{
                width: "100%",
                height: "890px",
                border: "none",
                transition: "all 300ms ease",
              }}
              title="ScoreAxis Widget"
            ></iframe>
            <script
              dangerouslySetInnerHTML={{
                __html: `
          window.addEventListener("DOMContentLoaded", (event) => {
            window.addEventListener("message", (event) => {
              if (event.data.appHeight && event.data.inst === "7c035") {
                const container = document.querySelector("#scoreaxis-widget-7c035 iframe");
                if (container) {
                  container.style.height = parseInt(event.data.appHeight) + "px";
                }
              }
            });
          });
        `,
              }}
            />
          </div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Arial, sans-serif",
              textAlign: "left",
              color: "#ffffff",
            }}
          >
            Data provided by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.scoreaxis.com/"
              style={{ color: "#4da6ff" }}
            >
              Scoreaxis
            </a>
          </div>
        </div>
      );
    } else if (activeTab === "matches") {
      return <div>Fixtures Coming Soon, for now use LiveScore</div>;
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="toptext">UEFA CHAMPIONS LEAGUE</h1>
      <br />
      <div className="tabs">
        {["news", "table", "matches"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "news"
              ? "Latest News"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <hr />
      {renderContent()}
    </div>
  );
};

export default Ucl;
