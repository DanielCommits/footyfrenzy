import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Dynamic API URL
    const API_URL =
      process.env.NODE_ENV === "production"
        ? "https://footyfrenzy.vercel.app/news"
        : "http://localhost:5000/news";

    // Fetch articles from the backend
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News Feed</h1>
      {news.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-list">
          {news.map((article) => (
            <div className="news-item" key={article.id}>
              <Link to={`/article/${article.id}`}>
                <img src={article.imageUrl} alt={article.title} />
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
