import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Left Column - Logo / NGO Name */}
        <div className="footer-column footer-brand">
          <h2 className="footer-title">Secular House Foundation</h2>
          <p className="tagline">
            Empowering Communities, Spreading Hope <br />
            Join Us in Making a Difference
          </p>
          <div className="social-links" aria-label="Social media links">
            <a
              href="https://www.facebook.com/share/1DDS7tSbws/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/thesecularhouse?igsh=MWtkM2VneGpleDZ6OA=="
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com/@thesecularhouse?si=UsUkHQVm6fFEEtGz"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://twitter.com/thesecularhouse"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:thesecularhouse@gmail.com">
              thesecularhouse@gmail.com
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:+919870447973">+91 9870447973</a>
            <br />
            <strong>Address:</strong>{" "}
            <a
              href="https://maps.app.goo.gl/mXcCkgaeHD4vUdEDA"
              target="_blank"
              rel="noopener noreferrer"
            >
              RZ 44, Geetanjali Park, West Sagarpur, Sagar Pur, New Delhi, India
            </a>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Secular House Foundation. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
