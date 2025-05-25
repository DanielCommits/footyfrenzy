import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "./Home.css";

const Transfers = () => {
  const [news, setNews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState(""); // Added search term state

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

  // Fetch and filter the news articles
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (article) =>
            article.title.toLowerCase().includes("transfers") ||
            article.description.toLowerCase().includes("transfers") ||
            (article.content &&
              article.content.toLowerCase().includes("transfers"))
        );

      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
    });

    return () => unsubscribe();
  }, []);

  // Inject the ad script for rightyclasp.com
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//rightyclasp.com/3a9cfe4e5c7829b05fa6c39f45408eed/invoke.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter news based on search term
  const filteredNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.content &&
        article.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-5">
      {/* Ad container above the news */}
      <h1 className="toptext">TRANSFERS</h1>
      <br />

      {/* Search Bar */}
      <div className="row mb-3">
        <input
          type="text"
          placeholder="Search by Players, Clubs, or Leagues"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          style={{ width: "100%" }}
        />
      </div>

      {/* Featured Articles */}
      <div className="row mb-4">
        {filteredNews[0] && (
          <div className="col-md-8 mb-3">
            <Link to={`/article/${filteredNews[0].id}`} className="card-link">
              <div className="card h-100">
                <img
                  src={filteredNews[0].imageUrl}
                  className="card-img-top"
                  alt={filteredNews[0].title}
                />
                <div className="card-body">
                  <h5 className="card-title">{filteredNews[0].title}</h5>
                  <p className="card-text">{filteredNews[0].description}</p>
                  <button className="btn btn-primary">Read Full Story</button>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Second and Third Articles */}
        <div className="col-md-4 d-flex flex-column gap-3">
          {filteredNews.slice(1, 3).map((article) => (
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

      {/* Regular Articles */}
      <div className="row">
        {filteredNews.slice(3).map((article) => (
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
      <div
        style={{
          width: 320,
          height: 50,
          margin: "24px auto 0 auto",
          textAlign: "center",
        }}
      >
        <div id="container-3a9cfe4e5c7829b05fa6c39f45408eed"></div>
      </div>
    </div>
  );
};

export default Transfers;
