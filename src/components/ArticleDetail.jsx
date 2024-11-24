import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the article details by ID
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/news`);
        const data = await response.json();
        const foundArticle = data.find((article) => article.id === parseInt(id));
        setArticle(foundArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
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
