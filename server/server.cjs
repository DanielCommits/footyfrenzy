const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// CORS middleware
app.use(cors());
app.use(express.json());

// Define an initial empty news array
let news = [];

// Root Route (Optional, for server check)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Fetch All News
app.get('/news', (req, res) => {
  res.json(news);
});

// Add News (POST /news)
app.post('/news', (req, res) => {
  const newArticle = { id: Date.now(), ...req.body };
  news.push(newArticle);
  res.json(newArticle);
});

// Update News (PUT /news/:id)
app.put('/news/:id', (req, res) => {
  const { id } = req.params;
  news = news.map((article) =>
    article.id === parseInt(id) ? { ...article, ...req.body } : article
  );
  res.json({ success: true });
});

// Delete News (DELETE /news/:id)
app.delete('/news/:id', (req, res) => {
  const { id } = req.params;
  news = news.filter((article) => article.id !== parseInt(id));
  res.json({ success: true });
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
