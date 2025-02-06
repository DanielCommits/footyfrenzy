import React from "react";
import "./LiveMatch.css";

const matches = [
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "LEG",
      logo: "https://seeklogo.com/images/C/cd-leganes-logo-A1B5A5A72C-seeklogo.com.png",
      score: 2,
    },
    awayTeam: {
      abbreviation: "RMA",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png",
      score: 3,
    },
  },
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "MIL",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 1,
    },
    awayTeam: {
      abbreviation: "GIR",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 7,
    },
  },
];

export default function MatchScoreboard() {
  return (
    <div className="match-container">
      <div className="row">
        {matches.map((match, index) => (
          <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6">
            <div className="match-card bg-secondary text-light p-2 d-flex flex-column">
              <div className="d-flex justify-content-between text-muted small w-100">
                <span className="textshii">{match.competition}</span>
                <span>{match.status}</span>
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
                    <span className="fw-semibold">
                      {match.homeTeam.abbreviation}
                    </span>
                  </div>
                  <div className="fw-bold text-end">{match.homeTeam.score}</div>
                </div>

                {/* Away Team */}
                <div className="d-flex align-items-center justify-content-between w-100 mt-1">
                  <div className="d-flex align-items-center flex-grow-1">
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.abbreviation}
                      className="match-logo me-2"
                    />
                    <span className="fw-semibold">
                      {match.awayTeam.abbreviation}
                    </span>
                  </div>
                  <div className="fw-bold text-end">{match.awayTeam.score}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
