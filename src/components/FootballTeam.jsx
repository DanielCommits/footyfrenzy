import React, { useState, useEffect } from "react";

const FootballTeam = () => {
  const [teamData, setTeamData] = useState(null);  // To store the team data
  const [loading, setLoading] = useState(true);    // To handle loading state
  const [error, setError] = useState(null);        // To handle error state

  // Function to fetch team data from the SportsDB API
  const fetchJSONData = () => {
    fetch("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Arsenal")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTeamData(data.teams[0]); // Assuming you're fetching one team, Arsenal
        setLoading(false);           // Set loading to false after the data is fetched
      })
      .catch((error) => {
        console.error("Unable to fetch data:", error);
        setError(error.message);     // Set error message if fetch fails
        setLoading(false);           // Set loading to false even if there's an error
      });
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchJSONData();
  }, []); // Empty dependency array means this effect runs only once (on mount)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {teamData ? (
        <div>
          <h1>{teamData.strTeam}</h1> {/* Display team name */}
          <img src={teamData.strTeamLogo} alt={teamData.strTeam} width="200" /> {/* Display team logo */}
          <p>{teamData.strDescriptionEN}</p> {/* Display team description */}
        </div>
      ) : (
        <p>No team data found.</p>
      )}
    </div>
  );
};

export default FootballTeam;
