import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import PremierLeague from "./components/PremierLeague";
import Laliga from "./components/Laliga"
import Transfers from './components/Transfers';
import AdminDashboard from "./components/AdminDashboard";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";
import LiveScores from "./components/LiveScores";
import Footer from "./components/Footer"; // Import the Footer component
import Betting from "./components/Betting";

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premier-league" element={<PremierLeague />} />
        <Route path="/la-liga" element={<Laliga />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/livescores" element={<LiveScores />} />
        <Route path="/betting" element={<Betting />} /> 
      </Routes>
      <Footer /> 
    </Router>
    </HelmetProvider>
  );
}

export default App;
