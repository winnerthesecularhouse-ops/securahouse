import React, { useState, useEffect } from "react";
import "./Hero.css";

const slides = [
  {
    title: "Explore the world of Political Science",
    subtitle:
      "with Sachin Sir, a pioneer educator with 5+ years of experience & a proven track record of producing toppers and guiding students.",
    button: "🏆 Start Your Journey Today",
    img: "SachinProf.jpg",
    alt: "Sachin Bansal"
  },
  {
    title: "Clear Your Concepts: Master Class 11th NCERT Political Science and Shape Your Future!",
    subtitle:
      "with Sachin Sir, a pioneer educator with 7+ years of experience & a proven track record of producing toppers and guiding students.",
    button: "🏆 Start Your Journey Today",
    img: "PolitalTheory.png",
    alt: "Polital Theory Book"
  },
  {
    title: "Unleash Your Potential, Ace Your Boards: Discover the Winning Formula for Excelling in your Political Science Board Examinations!",
    subtitle:
      "with Sachin Sir, a pioneer educator with 7+ years of experience & a proven track record of producing toppers and guiding students.",
    button: "🏆 Start Your Journey Today",
    img: "HeroImg3.png",
    alt: "Student learning political science"
  },
  {
    title: "Start your B.A (H) Political Science Preparation",
    subtitle:
      "with Sachin Sir, a pioneer educator with 7+ years of experience & a proven track record of producing toppers and guiding students.",
    button: "🏆 Start Your Journey Today",
    img: "Delhi University.png",
    alt: "Delhi University"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (index === current || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <section className="hero-section" aria-label="Hero Banner">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""} ${
              isTransitioning ? "transitioning" : ""
            }`}
            aria-hidden={index !== current}
          >
            <div className="hero-container">
              {/* Left Content */}
              <div className="hero-left">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                
              </div>

              {/* Right Image */}
              <div className="hero-right">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="slide-img"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator - Now positioned below content */}
      <div className="hero-dots-container">
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;