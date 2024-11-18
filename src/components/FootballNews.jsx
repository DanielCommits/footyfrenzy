import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FootballNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setNews(response.data);
      } catch (err) {
        setError('Failed to load news.');
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Football News</h1>
      {error && <p>{error}</p>}
      {news.length > 0 ? (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
              </a>
              <p>{article.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FootballNews;
