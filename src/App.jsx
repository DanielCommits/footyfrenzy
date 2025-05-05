import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PremierLeague from "./components/PremierLeague";
import Laliga from "./components/Laliga"
import Transfers from './components/Transfers';
import AdminDashboard from "./components/AdminDashboard";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";
import LiveScores from "./components/LiveScores";
import Footer from "./components/Footer";
import Betting from "./components/Betting";
import Ucl from "./components/ucl";
import { Analytics } from "@vercel/analytics/react"


function App() {
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
      <Analytics/>
    </Router>
  );
}

export default App;
