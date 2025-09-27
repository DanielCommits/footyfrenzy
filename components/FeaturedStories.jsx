// src/components/FeaturedStories.jsx
import React from "react";
import "./FeaturedStories.css"; // Ensure the path is correct

function FeaturedStories() {
  const stories = [
    {
      id: 9,
      title:
        "Man City players told to be 'very calm' about 115 FFP charges as club insists 'not one rule has been broken' amid potential threat of Premier League expulsion",
      description:
        "Manchester City bosses have told players to be “very calm” about the club’s 115-charge FFP case, claiming that “not one rule has been broken”.",
      image:
        "https://assets.goal.com/images/v3/bltcd0748b823e57e98/GOAL%20-%20Multiple%20Images%20-%203%20Stacked%20-%20Facebook%20-%202024-08-16T143707.282.png?auto=webp&format=pjpg&width=1080&quality=60",
      link: "/news/9",
      date: "1 day ago",
    },
    {
      id: 10,
      title:
        "Although Lamine Yamal won't replace Lionel Messi, Hansi Flick is the ideal person to supervise the development of the teenage phenomenon, and analogies to the Barcelona star are fair.",
      description:
        "The Spain wonderkid has opened the new season in spectacular fashion, and the sky is the limit if he doesn't get carried away with his own hype",
      image:
        "https://assets.goal.com/images/v3/blt93b6cf0c255ae0c6/Yamal-Messi%20comparisons%20going%20nowhere.jpg?auto=webp&format=pjpg&width=828&quality=60",
      link: "/news/10",
      date: "1 day ago",
    },
  ];

  return (
    <div className="featured-stories-container">
      {stories.map((story) => (
        <div key={story.id} className="featured-card">
          <a href={story.link} className="featured-card-link">
            <div className="featured-card-image">
              <img src={story.image} alt={story.title} />
            </div>
            <div className="featured-card-content">
              <h2 className="featured-card-title">{story.title}</h2>
              <p className="featured-card-description">{story.description}</p>
              <div className="featured-card-footer">
                <span className="featured-card-date">{story.date}</span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default FeaturedStories;
