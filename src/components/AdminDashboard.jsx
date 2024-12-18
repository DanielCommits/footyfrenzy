import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firebase configuration
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for image URL
  const [news, setNews] = useState([]);
  const [editId, setEditId] = useState(null); // State to hold the id of the article being edited

  // Fetch news with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort articles by createdAt in descending order
      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);

      localStorage.setItem("news", JSON.stringify(sortedArticles));
    });

    return () => unsubscribe(); // Cleanup the listener when component is unmounted
  }, []);

  // Handle form submission to add or edit an article
  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      description,
      imageUrl,
      createdAt: new Date(),
    };

    try {
      if (editId) {
        // Update existing article
        await updateDoc(doc(db, "news", editId), articleData);
        setEditId(null); // Clear the edit mode
      } else {
        // Add a new article
        await addDoc(collection(db, "news"), articleData);
      }

      // Reset form fields after submitting
      setTitle("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  // Handle delete article
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id)); // Delete the article from Firestore
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Handle edit article
  const handleEdit = (article) => {
    setTitle(article.title);
    setDescription(article.description);
    setImageUrl(article.imageUrl);
    setEditId(article.id); // Set editId to track the article being edited
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
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editId ? "Update Article" : "Add Article"}</button>
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
            <button onClick={() => handleEdit(article)}>Edit</button>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
