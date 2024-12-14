import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from 'react-router-dom';


const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort articles by createdAt in descending order (newest first)
      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
      // Store the articles in localStorage to avoid unnecessary re-fetching
      localStorage.setItem("news", JSON.stringify(sortedArticles));
    });

    return () => unsubscribe();  // Cleanup the listener when component is unmounted
  }, []);

  return (
    <div>
      <h2>Latest News...</h2>
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: "100px" }}
            />
            <p>{article.description}</p>
            <Link to={`/article/${article.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
