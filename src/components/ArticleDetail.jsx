import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const API_URL =
      process.env.NODE_ENV === "production"
        ? `https://footyfrenzy.vercel.app/news/${id}`
        : `http://localhost:5000/news/${id}`;

    const fetchArticle = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticle(data);
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
      <img src={article.imageUrl} alt={article.title} />
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetail;
