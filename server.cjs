const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

// Puppeteer Scraping for Football News
const scrapeFootballNews = async () => {
  const browser = await puppeteer.launch(); // Launch Chromium
  const page = await browser.newPage();

  try {
    // Navigate to BBC Sport football news page
    await page.goto('https://www.bbc.com/sport/football', { waitUntil: 'domcontentloaded' });

    // Extract news articles from the page
    const articles = await page.evaluate(() => {
      const articleNodes = document.querySelectorAll('.gs-c-promo');
      return Array.from(articleNodes).map(node => {
        const title = node.querySelector('.gs-c-promo-heading__title')?.innerText;
        const link = node.querySelector('a')?.href;
        const summary = node.querySelector('.gs-c-promo-summary')?.innerText;
        return { title, link, summary };
      }).filter(article => article.title && article.link);
    });

    await browser.close(); // Close the browser
    return articles;
  } catch (error) {
    console.error('Scraping failed:', error);
    await browser.close();
    throw error;
  }
};

// API endpoint for football news
app.get('/api/news', async (req, res) => {
  try {
    const news = await scrapeFootballNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Default route for root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the FootyFrenzy API</h1><p>Visit <a href="/api/news">/api/news</a> to see football news.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
