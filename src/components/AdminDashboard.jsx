import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState(""); // Updated for React Quill
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
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
      content, // Content is handled by React Quill
      source,
      date: date ? new Date(date).toISOString() : null,
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
    setContent(article.content); // Pre-fill article content
    setSource(article.source);
    setDate(article.date);
    setEditId(article.id);
  };

  return (
    <div>
      <h2 className="adminhead">Admin Dashboard</h2>
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
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Should be brief."
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
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your article content here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["link", "image", "video"],
              ],
            }}
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
              style={{ width: "100px"}}
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
