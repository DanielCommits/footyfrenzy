import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamically set the API URL based on environment
    const API_URL = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/${id}` // Vercel URL
      : `http://localhost:5000/news/${id}`; // Local URL for development

    // Fetch the article details by ID
    const fetchArticle = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Article not found");
        }
        const data = await response.json();
        setArticle(data); // Store the fetched article
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchArticle();
  }, [id]);

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // Show error message
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetail;
