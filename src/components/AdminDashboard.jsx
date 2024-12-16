import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firebase configuration
import { storage } from "../firebaseConfig"; // Import Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Functions for uploading to Firebase Storage

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to hold image file
  const [news, setNews] = useState([]);

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

  // Handle form submission to add a new article
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If there's an image, upload it first
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track progress (optional)
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          // Get the download URL after the image is uploaded
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const newArticle = { title, description, imageUrl, createdAt: new Date() };
          
          try {
            await addDoc(collection(db, "news"), newArticle); // Add the new article to Firestore
            setTitle("");
            setDescription("");
            setImageFile(null);
          } catch (error) {
            console.error("Error adding article:", error);
          }
        }
      );
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
          <label>Image Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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
