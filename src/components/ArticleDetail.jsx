import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

  if (error) return <p>{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <img
        src={article.imageUrl}
        alt={article.title}
        style={{ width: "100%" }}
      />
      <p>{article.description}</p>
      <div>
        <h4>Full Article:</h4>
        <p>{article.content}</p> {/* Display the full article content here */}
      </div>
    </div>
  );
};

export default ArticleDetail;
