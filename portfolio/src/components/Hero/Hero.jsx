import React, { useState, useEffect } from "react";
import "./Hero.css";

const slides = [
 
  {
    title: "With Shri OM Birla , Hon'ble Speaker Of Loksabha",
    img: "2nd.png",
    alt: "Sachin Bansal"
  },
  {
    title: "With Ms. Mukti Sanyal, Principle Of Bharti College, DU",
    img: "3rd.png",
    alt: "Sachin Bansal"
  },
  {
    title: "With My SOL Updates Team",
    img: "4th.png",
    alt: "Sachin Bansal"
  },
  {
    title: "With Political Science DEPT. Of HINDU College",
    img: "5th.png",
    alt: "Sachin Bansal"
  },
  {
    title: "With Political Science DEPT. Of BHASKARACHARYA College Of Applied Sciences",
    img: "6th.png",
    alt: "Sachin Bansal"
  },
  {
    title: "With The Principle Of SHIVAJI College, DU",
    img: "7th.png",
    alt: "Sachin Bansal"
  },
  {
    title: "Books In This Series",
    img: "1st.png",
    alt: "Sachin Bansal"
  },
  {
    title: "ECHOES Of History : OLD VS NEW",
    img: "8th.png",
    alt: "Sachin Bansal"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        const next = (current + 1) % slides.length;
        changeSlide(next);
      }, 5000);

      return () => clearInterval(interval);
    }, [current]);

  const changeSlide = (nextIndex) => {
    if (nextIndex === current) return;

    setPrev(current);
    setCurrent(nextIndex);
    setIsAnimating(true);

    // Reset after animation
    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, 1000); // Match with animation duration
  };

  const goToSlide = (index) => {
    if (index === current || isAnimating) return;
    changeSlide(index);
  };

  return (
    <section className="hero-section" aria-label="Hero Banner">
      <div className="hero-slider">
        {slides.map((slide, index) => {
          let className = "hero-slide";
          if (index === current && isAnimating) {
            className += " slide-in";
          } else if (index === prev && isAnimating) {
            className += " slide-out";
          } else if (index === current) {
            className += " active";
          }

          return (
            <div
              key={index}
              className={className}
              aria-hidden={index !== current}
            >
              <div className="hero-container">
                <div className="hero-left">
                  <h1>{slide.title}</h1>
                </div>
                <div className="hero-right">
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="slide-img"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero-dots-container">
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
