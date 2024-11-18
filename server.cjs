const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

// Example: Scrape football news from BBC Sport
const footballNewsURL = 'https://www.bbc.com/sport/football';

app.get('/api/news', async (req, res) => {
  try {
    const { data } = await axios.get(footballNewsURL);
    const $ = cheerio.load(data);

    const articles = [];
    $('.gs-c-promo').each((i, element) => {
      const title = $(element).find('.gs-c-promo-heading__title').text();
      const link = $(element).find('a').attr('href');
      const summary = $(element).find('.gs-c-promo-summary').text();

      if (title && link) {
        articles.push({
          title,
          link: link.startsWith('http') ? link : `https://www.bbc.com${link}`,
          summary,
        });
      }
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
