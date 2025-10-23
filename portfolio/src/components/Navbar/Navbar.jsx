import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // Calculate the position to scroll to (accounting for fixed header)
        const yOffset = -80; // Adjust this value based on your header height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      // Add a small delay to allow the page to load before scrolling
      const scrollAfterLoad = () => {
        if (document.readyState === 'complete') {
          scroll();
          window.removeEventListener('load', scrollAfterLoad);
        }
      };
      window.addEventListener('load', scrollAfterLoad);
    } else {
      scroll();
    }
    setIsMenuOpen(false);
  };
  
  // Handle scroll after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      // Clear the state to prevent scrolling again on re-renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Section */}
        <Link to="/" className="navbar-brand" onDoubleClick={() => navigate('/login')}>
          <div className="brand-logo">
            <img src="/NGOLogo.png" alt="NGO Logo" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Secular House Foundation</span>
            <span className="brand-tagline">Together for a Better Tomorrow</span>
          </div>
        </Link>

        {/* Menu Section */}
        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="navbar-start">
            <button className="navbar-item" onClick={() => scrollToSection("about")}>
              About
            </button>
            <button className="navbar-item" onClick={() => scrollToSection("achievements")}>
              Gallery
            </button>
            
            <button className="navbar-item" onClick={() => scrollToSection("contact")}>
              Contact Us
            </button>

            <button className="join-btn" onClick={() => navigate("/donateus")}>
              Donate Us
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
