import React, { useState, useEffect } from "react";
import "./Betting.css";

function Betting() {
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchOdds = async () => {
      const apiKey = "59802b5ff73466c30b63f46d0421caef";
      const url =
        "https://api.the-odds-api.com/v4/sports/soccer/odds?apiKey=" +
        apiKey +
        "&regions=us&markets=h2h&oddsFormat=decimal";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching odds: ${response.statusText}`);
        }
        const data = await response.json();
        setOdds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, []);

  useEffect(() => {
    const formatDate = () => {
      const today = new Date();
      const options = { day: '2-digit', month: '2-digit', weekday: 'long' };
      return today.toLocaleDateString(undefined, options); // e.g., "26/12 Thursday"
    };
    setCurrentDate(formatDate());
  }, []);

  if (loading) {
    return <div>Loading odds...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="betting-container">
      <div className="betting-header">Most Popular Odds</div>
      <div className="date-header">{currentDate}</div>
      {odds.map((match) => {
        const outcomes = match.bookmakers[0]?.markets[0]?.outcomes || [];

        // Ensure outcomes array has at least 3 elements (home, away, draw)
        const homeOdd = outcomes.find(outcome => outcome.name === match.home_team)?.price || "--";
        const awayOdd = outcomes.find(outcome => outcome.name === match.away_team)?.price || "--";
        const drawOdd = outcomes.find(outcome => outcome.name === "Draw")?.price || "--";

        return (
          <div key={match.id} className="match-card">
            <div className="match-details">
              <strong>{match.home_team} vs {match.away_team}</strong>
            </div>
            <div className="odds-row">
              <button className="odds-button">{homeOdd}</button>
              {drawOdd !== "--" && (
                <button className="odds-button">{drawOdd}</button>
              )}
              <button className="odds-button">{awayOdd}</button>
             
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Betting;
