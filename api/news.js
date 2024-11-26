// api/news.js
let news = [];

module.exports = (req, res) => {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    res.json(news); // Fetch all news
  } else if (method === 'POST') {
    const newArticle = { id: Date.now(), ...req.body };
    news.push(newArticle);
    res.json(newArticle);
  } else if (method === 'PUT') {
    // Update article by ID
    const articleIndex = news.findIndex((article) => article.id === parseInt(id));
    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    news[articleIndex] = { ...news[articleIndex], ...req.body };
    res.json({ success: true });
  } else if (method === 'DELETE') {
    // Delete article by ID
    const articleIndex = news.findIndex((article) => article.id === parseInt(id));
    if (articleIndex === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    news.splice(articleIndex, 1);
    res.json({ success: true });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
