import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firebase configuration

const AdminDashboard = () => {
  const [title, setTitle] = useState("");  // To store the title input value
  const [description, setDescription] = useState("");  // To store the description input value
  const [imageUrl, setImageUrl] = useState("");  // To store the image URL input value
  const [news, setNews] = useState([]);  // To store the fetched news articles

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

  // Handle form submission to add a new article
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, description, imageUrl };
    try {
      await addDoc(collection(db, "news"), newArticle); // Add the new article to Firestore
      // Fetch updated news after adding
      fetchNews();
      // Optionally, you can reset the form values
      setTitle("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // Handle delete article
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id)); // Delete the article from Firestore
      // After deleting, re-fetch and update localStorage
      fetchNews();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNews(articles);
      // Update localStorage with the latest news
      localStorage.setItem("news", JSON.stringify(articles));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Article</button>
      </form>

      <h3>Existing Articles</h3>
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <h4>{article.title}</h4>
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: "100px" }}
            />
            <p>{article.description}</p>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
