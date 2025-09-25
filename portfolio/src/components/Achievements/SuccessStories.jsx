import React, { useState, useEffect } from "react";
import "./SuccessStories.css";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/achievers";

const SuccessStories = () => {
  const [achievers, setAchievers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        // Fetch all achievers and show latest first (API already sorts createdAt desc)
        const res = await axios.get(`${API_URL}`);
        setAchievers(res.data || []);
      } catch (e) {
        console.error("Failed to load achievers", e);
        setAchievers([]);
      }
    };
    fetchAchievers();
  }, []);

  const totalSlides = Math.max(1, Math.ceil(achievers.length / 4));

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && achievers.length > 4) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, achievers.length]);

  const handleManualNavigation = (direction) => {
    setIsAutoPlaying(false);
    if (direction === "prev") prevSlide();
    else nextSlide();
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getCurrentStories = () => {
    const startIndex = currentSlide * 4;
    return achievers.slice(startIndex, startIndex + 4);
  };

  return (
    <section className="success-stories" aria-label="Success Stories">
      <div className="container">
        <h2>Success Stories</h2>
        <p className="section-subtitle">Pearls of Political Science</p>

        <div className="stories-carousel">
          <button
            className="nav-button prev"
            onClick={() => handleManualNavigation("prev")}
            aria-label="Previous slide"
          >
            &#8249;
          </button>

          <div className="stories-grid">
            {getCurrentStories().map((story) => (
              <div key={story._id} className="story-card">
                <div className="image-container">
                  <img src={story.image} alt={story.name} loading="lazy" />
                </div>
              </div>
            ))}
            {achievers.length === 0 && (
              <div style={{ padding: "1rem" }}>No achievers yet.</div>
            )}
          </div>

          <button
            className="nav-button next"
            onClick={() => handleManualNavigation("next")}
            aria-label="Next slide"
          >
            &#8250;
          </button>
        </div>

        <div className="slide-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentSlide === index ? "active" : ""}`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="cta-buttons">
          <Link to="/allachievers" className="cta-button" style={{ textDecoration: "none" }}>
            🏆 VIEW ALL ACHIEVERS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;