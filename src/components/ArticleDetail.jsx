import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./ArticleDetail.css";
import { TwitterTweetEmbed } from "react-twitter-embed";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const storedArticle = localStorage.getItem(`article_${id}`);
        if (storedArticle) {
          setArticle(JSON.parse(storedArticle));
        } else {
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

  const getTweetId = (url) => {
    try {
      const parts = url.split("/");
      return parts[parts.length - 1]; // The Tweet ID is usually the last part of the URL
    } catch {
      return null;
    }
  };

  
  useEffect(() => {
    const loadCommentWidget = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href =
        "https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.id = "hcb";
      script.type = "text/javascript";
      script.async = true;
      const pageURL = encodeURIComponent(
        (window.location + "").replace(/'/g, "%27").replace("+", "%2B")
      );
      script.src = `https://www.htmlcommentbox.com/jread?page=${pageURL}&mod=%241%24wq1rdBcg%241gh94zbht3hy5YlOfec1W%2F&opts=16798&num=10&ts=${Date.now()}`;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.head.removeChild(script);
      };
    };

    loadCommentWidget();
  }, []);
  useEffect(() => {
    if (!article) return;
  
    // Set the document title
    document.title = article.description || "FootyFrenzy | Football News and More";
  
    // Update meta description
    let descriptionTag = document.querySelector("meta[name='description']");
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content =
      article.description || "Latest football news and updates from FootyFrenzy.";
  
    // Optionally update Open Graph tags for social previews
    const updateOrCreateMeta = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
  
    updateOrCreateMeta("og:title", article.title || article.description);
    updateOrCreateMeta("og:description", article.description);
    updateOrCreateMeta("og:image", article.imageUrl || "defaultImage.jpg");
  }, [article]);

  if (error) return <p className="error-message">{error}</p>;
  if (!article) return <p className="loading-message">Loading...</p>;

 
  return (
    <div className="article-container">
      <div className="article-header">
        <h2>{article.description}</h2>
        <img
          src={article.imageUrl || "defaultImage.jpg"}
          alt={article.title || "Article"}
          className="article-image"
        />
      </div>
      <p className="article-type">{article.title}</p>
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
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Add a section for embedded Twitter post */}
      {article.embed && (
        <div className="embedded-post">
          <TwitterTweetEmbed tweetId={getTweetId(article.embed)} />
        </div>
      )}
      <div id="HCB_comment_box">
        <h4>Comments are loading...</h4>
      </div>
    </div>
  );
};

export default ArticleDetail;
