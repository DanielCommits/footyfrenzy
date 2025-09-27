import React from "react";
import "./TopStories.css";
import { MdAccessTimeFilled } from "react-icons/md";

const TopStories = () => {
  const topStories = [
    {
      title:
        "Premier League team news, injury latest, suspensions, previews and Fantasy Football - live updates",
      description:
        "Live match updates.",
      image:
        "https://e0.365dm.com/24/09/768x432/skysports-premier-league-liverpool_6692466.jpg?20240921160449",
      link: "/news/1",
      date: "Just now",
      source: "SkySports",
      logo: "data:image/jpeg;base64,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",
    },
    {
      title: "Flick refutes claim that Barcelona have a Champions League problem",
      image:
        "https://image-service.onefootball.com/transform?w=840&h=472&dpr=2&image=https%253A%252F%252Fcdn.jwplayer.com%252Fv2%252Fmedia%252FzRuwYr35%252Fposter.jpg%253Fwidth%253D720",
      link: "/news/2",
      date: "1 hr ago",
      source: "Youtube",
      logo: "https://static.vecteezy.com/system/resources/thumbnails/018/930/572/small/youtube-logo-youtube-icon-transparent-free-png.png",
    },
    {
      title:
        "David Raya magic rescues Arsenal but Champions League draw raises further questions",
      image:
        "https://image-service.onefootball.com/transform?w=336&h=252&dpr=2&image=https%3A%2F%2Fstatic.independent.co.uk%2F2024%2F09%2F19%2F22%2F2024-09-19T205724Z_29786767_UP1EK9J1M7MRM_RTRMADP_3_SOCCER-CHAMPIONS-ATA-ARS-REPORT.jpg%3Fquality%3D75%26width%3D1200%26auto%3Dwebp",
      link: "/news/3",
      date: "1 hr ago",
      source: "The Independent",
      logo: "https://image-service.onefootball.com/transform?w=48&dpr=2&image=https://filebucket.onefootball.com/2022/6/1656507538717-blob",
    },
    {
      title:
        "Joshua Zirkzee already 'looks a bit like' Zlatan Ibrahimovic but needs Hojlund.",
      image:
        "https://assets.goal.com/images/v3/blt0d3ea0afab8391e0/Zirkzee%20needs%20Hojlund%20to%20reach%20full%20potential.jpg?auto=webp&format=pjpg&width=828&quality=60",
      link: "/news/4",
      date: "1 hr ago",
      source: "GOAL",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEXwcFrxcFrzclvla1bIXUvCWklDHxkiDw0nEg4+HRcfDgxlLyaiTDyrUD+VRTjobFfrblh1NiuJQDOYRzneZ1PSYk9vMyleKyNUJyAwFhKMQTXUY0+xUkI2GRQAAAB+Oi8WDAqYdywaAAAArElEQVR4AeWQAwLEMBAAwypGzf9/8q72Dzpx1gu+A0SvwFmGCX2B4EmKSBBGD8KYoElIE8ZvCM4SughDqcCI1vMad2SsCzeh0wgRP64UaQ+8R5nhJyGIgpyzoqzqpBFGI3i2TNvUMIN9KTvreg31Lhykxq0sWMZlELCc5QJrOcxCWFuqUVM5Qquq4b6RtveA2hqCCTUlqDVCY9IaaaXweKqtf/MG5zXvcPv8CH97RgrPkt+UTAAAAABJRU5ErkJggg==",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <a
            href="/news/1"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card mb-5">
              <img
                src={topStories[0].image}
                className="card-img-top"
                alt={topStories[0].title}
              />
              <div className="card-body">
                <h3 className="big-card-title">{topStories[0].title}</h3>
                <p className="card-text description">
                  {topStories[0].description}
                </p>
                <div className="meta-text">
                  <img
                    src={topStories[0].logo}
                    alt="Source Logo"
                    className="source-logo"
                  />
                  <span className="source">{topStories[0].source}</span>
                  <span className="date">
                    <MdAccessTimeFilled size={20} />
                    &nbsp;{topStories[0].date}
                  </span>
                </div>
                <div className="btn btn-custom btn-primary mt-2 float-right">
                  Read More
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-md-6">
          {topStories.slice(1).map((story, index) => (
            <div className="card mb-4 d-flex" key={index}>
              <div className="row g-0 align-items-center">
                {" "}
                {/* Ensure alignment */}
                <div className="col-5 col-sm-4">
                  <img
                    src={story.image}
                    className="img-fluid story-image"
                    alt={story.title}
                  />
                </div>
                <div className="col-7 col-sm-8 d-flex flex-column justify-content-center">
                  <div className="card-body">
                    <h5 className="card-title">{story.title}</h5>
                    <div className="meta-text">
                      <img
                        src={story.logo}
                        alt="Source Logo"
                        className="source-logo"
                      />
                      <span className="source">{story.source}</span>
                      <span className="date">
                        {" "}
                        <MdAccessTimeFilled size={13} />
                        &nbsp;{story.date}
                      </span>
                    </div>

                    <a href={story.link} className="stretched-link"></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStories;
