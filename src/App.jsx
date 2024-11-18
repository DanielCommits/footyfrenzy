import React from 'react';
import FootballNews from './components/FootballNews';

const App = () => {
  return (
    <div>
      <header style={styles.header}>
        <h1>FootyFrenzy</h1>
        <nav>
          <a href="#news" style={styles.link}>News</a>
          <a href="#live-scores" style={styles.link}>Live Scores</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </nav>
      </header>

      <main style={styles.main}>
        <section id="news">
          <FootballNews /> {/* Displays scraped football news */}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© 2024 FootyFrenzy. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Example inline styles (or replace with CSS)
const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    marginLeft: '15px',
    textDecoration: 'none',
  },
  main: {
    padding: '20px',
  },
  footer: {
    textAlign: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    marginTop: '20px',
  },
};

export default App;
