import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
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
  const [content, setContent] = useState(""); // Content for React Quill
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [news, setNews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [embed, setEmbed] = useState("");

  // Fetch articles from Firestore and sort by date
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (querySnapshot) => {
      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt
          ? new Date(doc.data().createdAt.seconds * 1000)
          : null,
      }));
      const sortedArticles = articles.sort((a, b) => b.createdAt - a.createdAt);
      setNews(sortedArticles);
      localStorage.setItem("news", JSON.stringify(sortedArticles)); // Store in localStorage
    });

    return () => unsubscribe();
  }, []);

  // Submit form data to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedContent = DOMPurify.sanitize(content); // Sanitize content before storing

    const articleData = {
      title,
      description,
      imageUrl,
      content: sanitizedContent,
      source,
      date: date ? new Date(date).toISOString() : null,
      embed,
      createdAt: new Date(),
    };

    try {
      if (editId) {
        await updateDoc(doc(db, "news", editId), articleData);
        setEditId(null);
      } else {
        await addDoc(collection(db, "news"), articleData);
      }

      // Clear form fields
      setTitle("");
      setDescription("");
      setImageUrl("");
      setContent("");
      setSource("");
      setDate("");
      setEmbed("");
    } catch (error) {
      console.error("Error saving article:", error.message);
    }
  };

  // Delete an article by ID
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id));
    } catch (error) {
      console.error("Error deleting article:", error.message);
    }
  };

  // Populate form fields for editing
  const handleEdit = (article) => {
    setTitle(article.title);
    setDescription(article.description);
    setImageUrl(article.imageUrl);
    setContent(article.content);
    setSource(article.source);
    setDate(article.date ? article.date.split(".")[0] : ""); // Convert ISO to datetime-local
    setEmbed(article.embed || ""); // <-- Add this line to restore embed field
    setEditId(article.id);
  };

  return (
    <div>
      <h2 className="adminhead">Admin Dashboard</h2>

      {/* Article Form */}
      <form onSubmit={handleSubmit} className="admin-form">
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
          <label>Embed Post (Twitter Link):</label>
          <input
            type="text"
            placeholder="Enter Twitter embed link, remove script and add just the blockquote"
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
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

      {/* List of Articles */}
      <h3>Existing Articles</h3>
      <ul className="articles-list">
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
