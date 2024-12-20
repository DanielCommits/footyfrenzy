import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";
import LiveScores from "./components/LiveScores";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/livescores" element={<LiveScores />} />
      </Routes>
    </Router>
  );
}

export default App;
