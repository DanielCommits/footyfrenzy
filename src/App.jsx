import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PremierLeague from "./components/PremierLeague";
import Laliga from "./components/Laliga";
import Transfers from "./components/Transfers";
import AdminDashboard from "./components/AdminDashboard";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";
import LiveScores from "./components/LiveScores";
import Footer from "./components/Footer";
import Betting from "./components/Betting";
import Ucl from "./components/Ucl";
import { Analytics } from "@vercel/analytics/react";
import logo192 from "/WhatsApp Image 2025-06-04 at 18.45.01.jpeg.192x192.png";
import React, { useState, useEffect } from "react";

// Modern loader with logo and text (rounded corners)
function GlobalLoader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #23272f 0%, #353b48 100%)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logo192}
        alt="FootyFrenzy Logo"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "22px", // more rounded corners
          boxShadow: "0 4px 24px #0003",
          marginBottom: "16px",
          objectFit: "cover",
        }}
      />
      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "0.04em",
          marginBottom: "24px",
          textShadow: "0 2px 8px #0006",
        }}
      >
        FootyFrenzy
      </span>
      <div
        className="spinner-border text-light"
        role="status"
        style={{
          width: "2.2rem",
          height: "2.2rem",
          borderWidth: "0.3em",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 1.2s, then show app
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premier-league" element={<PremierLeague />} />
        <Route path="/la-liga" element={<Laliga />} />
        <Route path="/ucl" element={<Ucl />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/livescores" element={<LiveScores />} />
        <Route path="/betting" element={<Betting />} />
      </Routes>
      <Footer />
      <Analytics />
    </Router>
  );
}

export default App;
