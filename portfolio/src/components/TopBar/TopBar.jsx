import React from "react";
import "./TopBar.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span>📧 info@example.com</span>
        <span>📞 +440-98-5298</span>
        <span>📍 121 King Street, Melbourne</span>
      </div>
      <div className="topbar-right">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
