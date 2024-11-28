import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";  // Import Firebase configuration

const AdminDashboard = () => {
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
      <h2>Admin Dashboard</h2>
      {/* Display news and other admin functionalities */}
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <button>Delete</button> {/* You can add delete functionality */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
