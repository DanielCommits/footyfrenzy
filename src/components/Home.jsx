import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";  // Import Link
import "./Home.css";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort articles by createdAt in descending order (newest first)
      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
      // Optionally store in localStorage for offline use
      localStorage.setItem("news", JSON.stringify(sortedArticles));
    });

    return () => unsubscribe();  // Cleanup the listener when component is unmounted
  }, []);

  return (
    <div className="container mt-5">
      <h2>Latest News</h2>

      {/* Featured Articles: One large article and two stacked */}
<div className="row mb-4">
  {/* First article: Large */}
  <div className="col-md-8 mb-3">
    <div className="card h-100">
      <img
        src={news[0]?.imageUrl}
        className="card-img-top"
        alt={news[0]?.title}
      />
      <div className="card-body">
        <h5 className="card-title">{news[0]?.title}</h5>
        <p className="card-text">{news[0]?.description}</p>
        <Link to={`/article/${news[0]?.id}`} className="btn btn-primary">
          Full story
        </Link>
      </div>
    </div>
  </div>

  {/* Second and Third articles: Stacked */}
  <div className="col-md-4 d-flex flex-column gap-3">
    {news.slice(1, 3).map((article) => (
      <div key={article.id} className="card h-100">
        <img
          src={article.imageUrl}
          className="card-img-top"
          alt={article.title}
        />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <Link to={`/article/${article.id}`} className="btn btn-primary">
            Full story
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Regular Articles: Display the rest in a grid */}
      <div className="row">
        {news.slice(3).map((article) => (
          <div key={article.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={article.imageUrl}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <Link to={`/article/${article.id}`} className="btn btn-primary">
                  Full story
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
