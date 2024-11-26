import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Use the environment variable for the API URL
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/news'; // fallback to localhost if not set

    // Fetch articles from the backend
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
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
      {news.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-list">
          {news.map((article) => (
            <div className="news-item" key={article.id}>
              <Link to={`/article/${article.id}`}>
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt={article.title} />
                ) : (
                  <img src="default-image.jpg" alt="Default" /> // Fallback image
                )}
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
