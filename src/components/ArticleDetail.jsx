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

  // Helper to check if the embed is a blockquote or a link (support both x-tweet and twitter-tweet)
  const isBlockquote = (str) =>
    /<blockquote[\s\S]*class=["'][^"']*(twitter-tweet|x-tweet)[^"']*["'][\s\S]*<\/blockquote>/.test(str);
  const isValidTweetUrl = (url) =>
    /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/status\/\d+$/.test(url);

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
    document.title =
      article.description || "FootyFrenzy | Football News and More";

    // Update meta description
    let descriptionTag = document.querySelector("meta[name='description']");
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content =
      article.description ||
      "Latest football news and updates from FootyFrenzy.";

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

  useEffect(() => {
    if (
      article &&
      article.embed &&
      (isValidTweetUrl(article.embed) || isBlockquote(article.embed))
    ) {
      // Always reload the widgets script after rendering the blockquote
      const runWidget = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      // If the script is already present, just run the widget loader
      if (window.twttr && window.twttr.widgets) {
        runWidget();
      } else {
        // Otherwise, inject the script
        const existingScript = document.querySelector("script[src='https://platform.twitter.com/widgets.js']");
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          script.onload = runWidget;
          document.body.appendChild(script);
        }
      }
    }
  }, [article?.embed]);

  useEffect(() => {
    // Inject the ad config and script for rightyclasp.com
    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '8c15f02e69d0b5b4a2d9a21e4683d099',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    document.body.appendChild(scriptConfig);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//rightyclasp.com/8c15f02e69d0b5b4a2d9a21e4683d099/invoke.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(scriptConfig);
      document.body.removeChild(script);
    };
  }, []);

  if (error) return <p className="error-message">{error}</p>;
  if (!article) return <p className="loading-message">Loading...</p>;

  return (
    <div className="article-container">
      {/* Ad container before the article */}
      <div style={{ width: 320, height: 50, margin: "24px auto", textAlign: "center" }}>
        <div id="container-8c15f02e69d0b5b4a2d9a21e4683d099"></div>
      </div>
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

      {/* Ad hyperlink inserted between article content and embed */}
      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <a
          href="https://www.profitableratecpm.com/mmzdeybc?key=b1055a8d32d8c1f749678fbb014bcbe1"
          target="_blank"
          rel="noopener sponsored"
          style={{
            display: "inline-block",
            color: "#007bff",
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "1.1em",
          }}
        >
          Sponsored: Check this offer!
        </a>
      </div>

      {/* Embed X post: blockquote or link */}
      {article.embed &&
        (isBlockquote(article.embed) ? (
          <div
            className="embedded-post"
            dangerouslySetInnerHTML={{ __html: article.embed }}
          />
        ) : isValidTweetUrl(article.embed) ? (
          <div className="embedded-post">
            <blockquote className="twitter-tweet">
              <a href={article.embed}></a>
            </blockquote>
          </div>
        ) : null)}
      <div id="HCB_comment_box">
        <h4>Comments are loading...</h4>
      </div>
    </div>
  );
};

// When adding a blockquote in AdminDashboard, only paste the <blockquote ...>...</blockquote> part.
// Do NOT include the <script ...>...</script> tag from Twitter's embed code.

// Example to paste in the embed field:
{/* 
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚨 BREAKING: Barcelona are interested in Julian Alvarez in the medium term to replace Lewandowski.<br><br>— <a href="https://twitter.com/sport?ref_src=twsrc%5Etfw">@sport</a> <a href="https://t.co/P3VaDUPHkV">pic.twitter.com/P3VaDUPHkV</a></p>&mdash; Barça Universal (@BarcaUniversal) <a href="https://twitter.com/BarcaUniversal/status/1926624302570332262?ref_src=twsrc%5Etfw">May 25, 2025</a></blockquote>
*/}

export default ArticleDetail;
