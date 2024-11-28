import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig ";


const ArticleDetail = () => {
  const { id } = useParams(); // Get the dynamic ID from the route
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);  // State for handling errors

  useEffect(() => {
    const fetchArticle = async () => {
      const storedArticle = localStorage.getItem(`article_${id}`);
      if (storedArticle) {
        // If the article is in localStorage, use it
        setArticle(JSON.parse(storedArticle));
      } else {
        // Otherwise, fetch it from Firestore
        const articleRef = doc(db, "news", id);
        try {
          const docSnap = await getDoc(articleRef);
          if (docSnap.exists()) {
            const articleData = docSnap.data();
            setArticle(articleData);
            // Store the fetched article in localStorage for future use
            localStorage.setItem(`article_${id}`, JSON.stringify(articleData));
          } else {
            setError("No such article found!");  // Set error if article is not found
          }
        } catch (err) {
          setError("Failed to fetch article. Please try again later.");  // Catch any other errors
          console.error("Error fetching article:", err);
        }
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p>{error}</p>;  // Display error if exists
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
    </div>
  );
};

export default ArticleDetail;
