import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
  FaInstagram,
  FaFutbol,
  FaTelegram,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo-container">
          <Link to="/" className="footer-logo-link">
            <h1 className="sitename">
              <FaFutbol /> Frenzyball
            </h1>
          </Link>
        </div>

        {/* Description Section */}
        <p className="footer-description">
        Frenzyball provides a variety of information and resources related to
          football, including news, scores, statistics, and analysis.
        </p>

        {/* Social Links Section */}
        <ul className="socials">
          <li>
            <a
              href="https://web.facebook.com/FootyFrenzynow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/Thatmaverickk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              href="https://whatsapp.com/channel/0029VaRaJEKJkK767s3IDV2a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DanielCommits/FootyFrenzy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/thebigdan_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/+ZwOcAGEfYoE3MzM8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </a>
          </li>
        </ul>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-menu">
          <p>
            copyright &copy;{" "}
            <a href="https://danielcommits.github.io/MyPortfolio/">
              Daniel Develops, 2024.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
