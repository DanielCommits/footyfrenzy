import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const querySnapshot = await getDocs(collection(db, "news"));
      const articles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNews(articles);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News Feed</h1>
      {news.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-list">
          {news.map((article) => (
            <div className="news-item" key={article.id}>
              <Link to={`/article/${article.id}`}>
                <img src={article.imageUrl} alt={article.title} />
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
