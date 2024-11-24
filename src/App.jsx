import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import ArticleDetail from "./components/ArticleDetail";  // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/article/:id" element={<ArticleDetail />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
