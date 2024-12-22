import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState(""); // New state for article source
  const [date, setDate] = useState(""); // New state for publication date
  const [news, setNews] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
      localStorage.setItem("news", JSON.stringify(sortedArticles));
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      description,
      imageUrl,
      content,
      source,
      tags: ["Premier League", "La Liga", "Transfers"], // Corrected format
      date: date ? new Date(date).toISOString() : null, // Format for consistent storage
      createdAt: new Date(),
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "news", editId), articleData);
        setEditId(null);
      } else {
        await addDoc(collection(db, "news"), articleData);
      }

      setTitle("");
      setDescription("");
      setImageUrl("");
      setContent("");
      setSource("");
      setDate("");
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setDescription(article.description);
    setImageUrl(article.imageUrl);
    setContent(article.content);
    setSource(article.source); // Pre-fill the source during edit
    setDate(article.date); // Pre-fill the date during edit
    setEditId(article.id);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tag:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description/Title:</label>
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
        <div>
          <label>Article Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter full article content"
            required
          />
        </div>
        <div>
          <label>Source:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source (e.g., Goal, ESPN)"
            required
          />
        </div>
        <div>
          <label>Publication Date:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editId ? "Update Article" : "Add Article"}
        </button>
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
