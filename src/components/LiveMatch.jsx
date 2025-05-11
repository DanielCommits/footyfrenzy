import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./LiveMatch.css";

const API_KEY = "f5be21065fa69f1c7b9c535ec9b564c0";

const IMPORTANT_LEAGUES = [
  39, // Premier League
  140, // La Liga
  2, // UEFA Champions League
  3, // UEFA Europa League
  78, // Bundesliga
  61, // Ligue 1
  101, // Club World Cup
  307, // Saudi Pro League
  253, // MLS
  135, // Serie A
];

export default function LiveMatches() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [leagues, setLeagues] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await axios.get(
          "https://v3.football.api-sports.io/fixtures",
          {
            headers: { "x-apisports-key": API_KEY },
            params: { live: "all" },
          }
        );

        const matches = res.data.response.filter((m) =>
          IMPORTANT_LEAGUES.includes(m.league.id)
        );
        const leagueNames = [
          "All",
          ...new Set(matches.map((m) => m.league.name)),
        ];
        setLeagues(leagueNames);
        setSelectedLeague(leagueNames[0]);
        setLiveMatches(matches);
      } catch (err) {
        console.error("Error fetching live matches", err);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered =
    selectedLeague === "All"
      ? liveMatches
      : liveMatches.filter((m) => m.league.name === selectedLeague);

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollNext = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container py-4">
      {/* League Dropdown */}
      <div className="mb-4 d-flex flex-column">
        <label className="form-label fw-bold">Live Matches</label>
        <select
          className="form-select w-100"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          {leagues.map((league, idx) => (
            <option key={idx} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {/* Match Cards Slider */}
      {filtered.length > 0 ? (
        <div className="position-relative">
          {filtered.length > 1 && (
            <>
              <button className="slider-arrow prev" onClick={scrollPrev}>
                ‹
              </button>
              <button className="slider-arrow next" onClick={scrollNext}>
                ›
              </button>
            </>
          )}

          <div
            className="d-flex overflow-auto slider-wrapper"
            ref={sliderRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {filtered.map((match) => (
              <div
                key={match.fixture.id}
                className="match-card text-light p-3 d-flex flex-column me-3"
                style={{ minWidth: "300px", maxWidth: "300px" }}
              >
                <div className="d-flex justify-content-between text-muted small w-100">
                  <span className="textshii">{match.league.name}</span>
                  <span className="textshii">{match.fixture.status.short}</span>
                </div>

                <div className="mt-3 w-100">
                  {/* Home */}
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center flex-grow-1">
                      <img
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        className="match-logo me-2"
                      />
                      <span className="fw-semibold textcol">
                        {match.teams.home.name}
                      </span>
                    </div>
                    <div className="fw-bold text-end textcol">
                      {match.goals.home}
                    </div>
                  </div>

                  {/* Away */}
                  <div className="d-flex align-items-center justify-content-between w-100 mt-2">
                    <div className="d-flex align-items-center flex-grow-1">
                      <img
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        className="match-logo me-2"
                      />
                      <span className="fw-semibold textcol">
                        {match.teams.away.name}
                      </span>
                    </div>
                    <div className="fw-bold text-end textcol">
                      {match.goals.away}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted">No live matches for now.</p>
      )}
    </div>
  );
}
