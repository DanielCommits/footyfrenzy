import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the dynamic ID from the route
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleRef = doc(db, "news", id);
      const docSnap = await getDoc(articleRef);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such article!");
      }
    };

    fetchArticle();
  }, [id]);

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
