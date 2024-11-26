// api/news.js
let news = [];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.json(news); // Fetch all news
  } else if (req.method === 'POST') {
    const newArticle = { id: Date.now(), ...req.body };
    news.push(newArticle);
    res.json(newArticle);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    news = news.map((article) =>
      article.id === parseInt(id) ? { ...article, ...req.body } : article
    );
    res.json({ success: true });
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    news = news.filter((article) => article.id !== parseInt(id));
    res.json({ success: true });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
