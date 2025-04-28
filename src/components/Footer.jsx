import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
  FaInstagram,
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
            <h1 className="sitename">FootyFrenzy</h1>
          </Link>
        </div>

        {/* Description Section */}
        <p className="footer-description">
          Experience the thrill of football like never before with live-scores,
          real-time updates, and unparalleled coverage from every corner of the
          globe.
        </p>

        {/* Social Links Section */}
        <ul className="socials">
          <li>
            <a
              href="https://web.facebook.com/footyfrenzyx/"
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
              href="https://www.instagram.com/thatoneguyyx/"
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
              Daniel Develops, 2025.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
