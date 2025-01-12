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
      return parts[parts.length - 1];
    } catch {
      return null;
    }
  };

  const isYouTubeEmbed = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const isInstagramEmbed = (url) =>
    typeof url === "string" && url.includes("instagram.com");

  useEffect(() => {
    if (article?.embed && isInstagramEmbed(article.embed)) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [article]);

  if (error) return <p className="error-message">{error}</p>;
  if (!article) return <p className="loading-message">Loading...</p>;

  return (
    <div className="article-container">
      <div className="article-header">
        <h2>{article.description}</h2>
        <img
          src={article.imageUrl || "/defaultImage.jpg"}
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
          <strong>Published on:</strong>{" "}
          {article.date ? new Date(article.date).toLocaleString() : "N/A"}
        </p>
      </div>

      <div className="article-content">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Embed Section */}
      {article.embed && (
        <div className="embedded-post">
          {article.embed.includes("twitter.com") && (
            <TwitterTweetEmbed tweetId={getTweetId(article.embed)} />
          )}
          {isYouTubeEmbed(article.embed) && (
            <iframe
              width="100%"
              height="315"
              src={article.embed
                .replace("watch?v=", "embed/")
                .replace(
                  /https:\/\/youtu\.be\//,
                  "https://www.youtube.com/embed/"
                )}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {isInstagramEmbed(article.embed) && (
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              style={{ maxWidth: "540px", margin: "1rem auto" }}
            >
              <a href={article.embed} target="_blank" rel="noopener noreferrer">
                Instagram Post
              </a>
            </blockquote>
          )}
        </div>
      )}

      <div id="HCB_comment_box">
        <a href="http://www.htmlcommentbox.com">Comments</a> are loading...
      </div>
    </div>
  );
};

export default ArticleDetail;
