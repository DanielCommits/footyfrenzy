import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Firebase Firestore setup

const ArticleDetail = ({ match }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleRef = db.collection("articles").doc(match.params.id);
      const doc = await articleRef.get();
      if (doc.exists) {
        setArticle(doc.data());
      } else {
        console.log("No such article!");
      }
    };

    fetchArticle();
  }, [match.params.id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.imageUrl} alt={article.title} style={{ width: "100%" }} />
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleDetail;
