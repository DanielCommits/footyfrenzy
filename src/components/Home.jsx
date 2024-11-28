import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";  // Import Firebase configuration

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const storedNews = localStorage.getItem("news");
      if (storedNews) {
        // If data exists in localStorage, load it
        setNews(JSON.parse(storedNews));
      } else {
        // Otherwise, fetch from Firestore
        try {
          const querySnapshot = await getDocs(collection(db, "news"));
          const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNews(articles);
          // Store the fetched data in localStorage
          localStorage.setItem("news", JSON.stringify(articles));
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News...</h2>
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <img src={article.imageUrl} alt={article.title} style={{ width: "100px" }} />
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
