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
      score: 0,
    },
  },
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "PSG",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 4,
    },
    awayTeam: {
      abbreviation: "MCI",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 2,
    },
  },
  
];

export default function MatchScoreboard() {
  return (
    <div className="container py-4">
      <div className="row gy-4">
        {matches.map((match, index) => (
          <div key={index} className="col-md-4">
            <div className="card bg-secondary text-light p-3">
              <div className="d-flex justify-content-between text-muted">
                <span>{match.competition}</span>
                <span>{match.status}</span>
              </div>
              <div className="mt-3">
                {/* Home Team */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.abbreviation}
                      className="match-logo me-2"
                    />
                    <span className="fw-bold">{match.homeTeam.abbreviation}</span>
                  </div>
                  <span className="fw-bold">{match.homeTeam.score}</span>
                </div>
                {/* Away Team */}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.abbreviation}
                      className="match-logo me-2"
                    />
                    <span className="fw-bold">{match.awayTeam.abbreviation}</span>
                  </div>
                  <span className="fw-bold">{match.awayTeam.score}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
