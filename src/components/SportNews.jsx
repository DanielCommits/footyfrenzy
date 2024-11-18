import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importing axios for fetching data

const SportsNews = () => {
  const [articles, setArticles] = useState([]); // Store articles data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  // Fetch news from Mediastack API
  const fetchSportsNews = async () => {
    const apiKey = '6ba6e4305d627d816db0688b60a988eb';  // Replace with your actual Mediastack API key
    try {
      const response = await axios.get('http://api.mediastack.com/v1/news', {
        params: {
          access_key: apiKey,
          categories: 'sports',  // Get sports-related news
          sort: 'published_desc',  // Sort articles by the newest first
        }
      });
      setArticles(response.data.data);  // Set the fetched articles into state
      setLoading(false);  // Stop loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);  // Set error if the fetch fails
      setLoading(false);  // Stop loading
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSportsNews();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Render loading, error, or the actual data
  if (loading) {
    return <p>Loading sports news...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error}</p>;
  }

  return (
    <div>
      <h1>Latest Sports News</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            <p>{article.description}</p>
            <p><strong>Source:</strong> {article.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsNews;
