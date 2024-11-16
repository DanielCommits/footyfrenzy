import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [headlines, setHeadlines] = useState([]);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await axios.get(
                    "https://cors-anywhere.herokuapp.com/https://www.goal.com/en/news"
                );
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, "text/html");

                const fetchedHeadlines = [...doc.querySelectorAll("h3.headline")].map((el) =>
                    el.innerText.trim()
                );

                setHeadlines(fetchedHeadlines);
            } catch (error) {
                console.error("Error fetching headlines:", error);
            }
        };

        fetchHeadlines();
    }, []);

    return (
        <div>
            <h1>Football News Headlines</h1>
            <ul>
                {headlines.map((headline, index) => (
                    <li key={index}>{headline}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
