import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [news, setNews] = useState([]);

  // Fetch the articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('http://localhost:5000/news');
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = { title, description, imageUrl };

    // Send the article data to the backend
    const response = await fetch('http://localhost:5000/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });

    if (response.ok) {
      const updatedNews = await response.json();
      setNews((prevNews) => [...prevNews, updatedNews]);
      alert('Article added successfully!');
    } else {
      alert('Failed to add article');
    }
  };

  // Delete an article by ID
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/news/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setNews(news.filter((article) => article.id !== id));
      alert('Article deleted successfully!');
    } else {
      alert('Failed to delete article');
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
            <img src={article.imageUrl} alt={article.title} style={{ width: '100px' }} />
            <p>{article.description}</p>
            <button onClick={() => handleDelete(article.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
