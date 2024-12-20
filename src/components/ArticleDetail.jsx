import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./ArticleDetail.css";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Check local storage for the article
        const storedArticle = localStorage.getItem(`article_${id}`);
        if (storedArticle) {
          setArticle(JSON.parse(storedArticle));
        } else {
          // Fetch article from Firestore
          const articleRef = doc(db, "news", id);
          const docSnap = await getDoc(articleRef);
          if (docSnap.exists()) {
            const articleData = docSnap.data();
            articleData.date = articleData.date
              ? new Date(articleData.date).toISOString()
              : null;
            setArticle(articleData);
            localStorage.setItem(`article_${id}`, JSON.stringify(articleData));
          } else {
            setError("Article not found.");
          }
        }
      } catch (err) {
        setError("Failed to fetch article. Please try again later.");
        console.error("Error fetching article:", err);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const loadCommentWidget = () => {
      // Add stylesheet
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href =
        "https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0";
      document.head.appendChild(link);

      // Add script
      const script = document.createElement("script");
      script.id = "hcb";
      script.type = "text/javascript";
      script.async = true;
      const pageURL = encodeURIComponent(
        (window.location + "").replace(/'/g, "%27").replace("+", "%2B")
      );
      script.src = `https://www.htmlcommentbox.com/jread?page=${pageURL}&mod=%241%24wq1rdBcg%241gh94zbht3hy5YlOfec1W%2F&opts=16798&num=10&ts=${Date.now()}`;
      document.head.appendChild(script);

      // Cleanup on unmount
      return () => {
        document.head.removeChild(link);
        document.head.removeChild(script);
      };
    };

    loadCommentWidget();
  }, []);

  if (error) return <p className="error-message">{error}</p>;
  if (!article) return <p className="loading-message">Loading...</p>;

  return (
    <div className="article-container">
      <div className="article-header">
        <h2>{article.title}</h2>
        <img
          src={article.imageUrl || "defaultImage.jpg"}
          alt={article.title || "Article"}
          className="article-image"
        />
        <p>{article.description}</p>
      </div>

      <div className="article-info">
        <p>
          <strong>Source:</strong> {article.source || "Unknown"}
        </p>
        <p>
          <strong>Published on:</strong>
          {article.date ? new Date(article.date).toLocaleString() : "N/A"}
        </p>
      </div>

      <div className="article-content">
        <p>{article.content}</p>
      </div>

      <div id="HCB_comment_box">
        <a href="http://www.htmlcommentbox.com">Widget</a> is loading
        comments...
      </div>
    </div>
  );
};

export default ArticleDetail;
