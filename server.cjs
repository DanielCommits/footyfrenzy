const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let news = [];

// Root Route (Optional, for server check)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Fetch All News
app.get('/news', (req, res) => {
  res.json(news);
});

// Add News
// Add News with Image
app.post('/news', (req, res) => {
    const newArticle = { id: Date.now(), ...req.body };
    news.push(newArticle);
    res.json(newArticle);
  });
  

// Update News
app.put('/news/:id', (req, res) => {
  const { id } = req.params;
  news = news.map((article) =>
    article.id === parseInt(id) ? { ...article, ...req.body } : article
  );
  res.json({ success: true });
});

// Delete News
app.delete('/news/:id', (req, res) => {
  const { id } = req.params;
  news = news.filter((article) => article.id !== parseInt(id));
  res.json({ success: true });
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
