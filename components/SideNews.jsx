import React from "react";
import { Link } from "react-router-dom";
import "./SideNews.css"; 

const SideNews = () => {
  const stories = [
    {
      id: 5,
      title: "Cristiano Ronaldo makes huge predictions for Lamine Yamal & Jude Bellingham",
      image:
      "https://image-service.onefootball.com/transform?w=336&h=252&dpr=2&image=https%3A%2F%2Fimages2.minutemediacdn.com%2Fimage%2Fupload%2Fc_crop%2Cw_3737%2Ch_2102%2Cx_0%2Cy_170%2Fc_fill%2Cw_1440%2Car_16%3A9%2Cf_auto%2Cq_auto%2Cg_auto%2Fimages%2FGettyImages%2Fmmsport%2F90min_en_international_web%2F01j85dtam3sycss9wrnz.jpg",
      video: null,
      sourceLogo: "https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://filebucket.onefootball.com/2022/3/1647627159464-blob",
      sourceName: "90min",
      time: "17 Sept ago",
    },
    {
      id: 6,
      title: "Hugo Broos' Bafana Bafana drop on latest Fifa rankings as Nigeria's Super Eagles learn new position after 2025 Afcon qualifiers",
      video: null,
      image: "https://assets.goal.com/images/v3/blt33ad0352f798650a/Teboho%20Mokoena%20of%20Bafana%20Bafana-2.jpg?auto=webp&format=pjpg&width=1080&quality=60",
      sourceLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEXwcFrxcFrzclvla1bIXUvCWklDHxkiDw0nEg4+HRcfDgxlLyaiTDyrUD+VRTjobFfrblh1NiuJQDOYRzneZ1PSYk9vMyleKyNUJyAwFhKMQTXUY0+xUkI2GRQAAAB+Oi8WDAqYdywaAAAArElEQVR4AeWQAwLEMBAAwypGzf9/8q72Dzpx1gu+A0SvwFmGCX2B4EmKSBBGD8KYoElIE8ZvCM4SughDqcCI1vMad2SsCzeh0wgRP64UaQ+8R5nhJyGIgpyzoqzqpBFGI3i2TNvUMIN9KTvreg31Lhykxq0sWMZlELCc5QJrOcxCWFuqUVM5Qquq4b6RtveA2hqCCTUlqDVCY9IaaaXweKqtf/MG5zXvcPv8CH97RgrPkt+UTAAAAABJRU5ErkJggg==",
      sourceName: "GOAL",
      time: "3 hours ago",
    },
    {
      id: 7,
      title: "🗣️ Leicester confront PL for answers after 'false image' VAR controversy",
      image:
      "https://image-service.onefootball.com/transform?w=336&h=252&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2024%2F09%2FFulham-FC-v-Leicester-City-FC-Premier-League-1726754527-1000x667.jpg",
      video: null,
      sourceLogo: "https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://images.onefootball.com/blogs_logos/circle_onefootball.png",
      sourceName: "One Football",
      time: "2 hours ago",
    },
    {
      id: 8,
      title: "Acerbi jokes over shirt request to Haaland: ‘He didn’t give it to me’",
      video: null,
      image: "https://image-service.onefootball.com/transform?w=336&h=252&dpr=2&image=https%3A%2F%2Ficdn.football-italia.net%2Fwp-content%2Fuploads%2F2024%2F09%2FFrancesco-Acerbi-Erling-Haaland-Manchester-City-Inter.jpg",
      sourceLogo: "https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://filebucket.onefootball.com/2024/1/1705342796853-blob",
      sourceName: "Football Italia",
      time: "1 day ago",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        {stories.map((story) => (
          <div key={story.id} className="col-lg-3 col-md-6 mb-4">
            <div className="news-card">
              <Link to={`/news/${story.id}`}>
                <div className="thumbnail">
                  {story.video ? (
                    <video src={story.video} alt={story.title} controls />
                  ) : (
                    <img src={story.image} alt={story.title} />
                  )}
                </div>
                <h3 className="news-title">{story.title}</h3>
              </Link>
              <div className="news-meta">
                <img src={story.sourceLogo} alt={story.sourceName} className="source-logo" />
                <span>{story.sourceName}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="news-time">{story.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNews;
