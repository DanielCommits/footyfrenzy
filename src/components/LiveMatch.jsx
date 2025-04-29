import React from "react";
import "./LiveMatch.css";

const matches = [
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "ARS",
      logo: "https://images.seeklogo.com/logo-png/32/1/arsenal-f-c-logo-png_seeklogo-325701.png",
      score: 0,
    },
    awayTeam: {
      abbreviation: "PSG",
      logo: "https://images.seeklogo.com/logo-png/25/1/psg-logo-png_seeklogo-256583.png",
      score: 1,
    },
  },
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "Al Hilal",
      logo: "https://cdn.soccersapi.com/images/soccer/teams/18/3361.png",
      score: 1,
    },
    awayTeam: {
      abbreviation: "Al Ahli Saudi",
      logo: "https://cdn.soccersapi.com/images/soccer/teams/18/5638.png",
      score: 3,
    },
  },
];

export default function MatchScoreboard() {
  return (
    <div className="match-container">
      <div className="row">
        {matches.map((match, index) => (
          <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6">
            <div className="match-card text-light p-2 d-flex flex-column">
              <div className="d-flex justify-content-between text-muted small w-100">
                <span className="textshii">{match.competition}</span>
                <span className="textshii">{match.status}</span>
              </div>
              <div className="mt-3 w-100">
                {/* Home Team */}
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center flex-grow-1">
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.abbreviation}
                      className="match-logo me-2"
                    />
                    <span className="fw-semibold textcol">
                      {match.homeTeam.abbreviation}
                    </span>
                  </div>
                  <div className="fw-bold text-end textcol">{match.homeTeam.score}</div>
                </div>

                {/* Away Team */}
                <div className="d-flex align-items-center justify-content-between w-100 mt-1">
                  <div className="d-flex align-items-center flex-grow-1">
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.abbreviation}
                      className="match-logo me-2"
                    />
                    <span className="fw-semibold textcol">
                      {match.awayTeam.abbreviation}
                    </span>
                  </div>
                  <div className="fw-bold text-end textcol">{match.awayTeam.score}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
