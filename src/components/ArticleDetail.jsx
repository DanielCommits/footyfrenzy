import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./ArticleDetail.css"; // assuming styles are in the CSS file

const ArticleDetail = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const storedArticle = localStorage.getItem(`article_${id}`);
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      } else {
        const articleRef = doc(db, "news", id);
        try {
          const docSnap = await getDoc(articleRef);
          if (docSnap.exists()) {
            const articleData = docSnap.data();
            setArticle(articleData);
            localStorage.setItem(`article_${id}`, JSON.stringify(articleData));
          } else {
            setError("No such article found!");
          }
        } catch (err) {
          setError("Failed to fetch article. Please try again later.");
          console.error("Error fetching article:", err);
        }
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!article) return <p className="loading-message">Loading...</p>;

  return (
    <div className="article-container">
      <div className="article-header">
        <h2>{article.title}</h2>
        <img
          src={article.imageUrl || "defaultImage.jpg"}  
          alt={article.title}
          className="article-image"
        />
        <p>{article.description}</p>
      </div>

      <div className="article-info">
        <p><strong>Source:</strong> {article.source}</p>
        <p><strong>Published on:</strong> {new Date(article.date).toLocaleString()}</p>
      </div>

      <div className="article-content">
        <h4>FULL STORY:</h4>
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
