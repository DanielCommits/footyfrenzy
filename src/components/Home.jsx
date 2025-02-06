import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom"; // Import Link
import LiveMatch from "./LiveMatch";
import "./Home.css";

const Home = () => {
  const [news, setNews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window size

  // Function to handle window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set up resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
      localStorage.setItem("news", JSON.stringify(sortedArticles));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>

      <div className="container mt-5">
      <LiveMatch />
        <h1 className="toptext">LATEST NEWS</h1>
        <br />

        {/* Featured Articles: One large article and two stacked */}
        <div className="row mb-4">
          <div className="col-md-8 mb-3">
            <Link to={`/article/${news[0]?.id}`} className="card-link">
              <div className="card h-100">
                <img
                  src={news[0]?.imageUrl}
                  className="card-img-top"
                  alt={news[0]?.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{news[0]?.title}</h5>
                  <p className="card-text">{news[0]?.description}</p>
                  <button className="btn btn-primary">Read Full Story</button>
                </div>
              </div>
            </Link>
          </div>

          {/* Second and Third articles: Stacked */}
          <div className="col-md-4 d-flex flex-column gap-3">
            {news.slice(1, 3).map((article) => (
              <Link
                to={`/article/${article.id}`}
                key={article.id}
                className="card-link"
              >
                <div
                  className={`card h-100 ${windowWidth <= 768 ? "card-horizontal" : ""}`}
                >
                  <div className="card-img-container">
                    <img
                      src={article.imageUrl}
                      className={`card-img ${windowWidth <= 768 ? "card-img-left" : "card-img-top"}`}
                      alt={article.title}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Regular Articles: Display the rest in a grid */}
        <div className="row">
          {news.slice(3).map((article) => (
            <div key={article.id} className="col-md-4 col-12 mb-3">
              <Link to={`/article/${article.id}`} className="card-link">
                <div className="card card-horizontal h-100">
                  <div
                    className={`card-img-top ${window.innerWidth <= 768 ? "card-img-left" : ""}`}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
