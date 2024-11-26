import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Dynamic API URL
    const API_URL = process.env.REACT_APP_API_URL
      ? `${process.env.REACT_APP_API_URL}/${id}` // Fetch the article by ID
      : `http://localhost:5000/news/${id}`; // Local URL for development

    // Fetch the article details by ID
    const fetchArticle = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticle(data); // Assuming the API returns the single article
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetail;
