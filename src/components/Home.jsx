import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch articles from the backend
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News Feed</h1>
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
    </div>
  );
};

export default Home;
