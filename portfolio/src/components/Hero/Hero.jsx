import React, { useState, useEffect, useRef } from "react";
import "./Hero.css";

const slides = [
  { title: "Professor, Hansraj College, Mr. Prabhanshu Ojha", img: "Professor, Hansraj College, Mr. Prabhanshu Ojha.jpg", alt: "Slide 1" },
  { title: "Speaker of Loksabha, Shri Om Birla", img: "Speaker of Loksabha, Shri Om Birla.jpg", alt: "Slide 2" },
  { title: "Professor, Dayal Singh College, DU Vijay Verma", img: "Professor, Dayal Singh College, DU Vijay Verma.jpg", alt: "Slide 3" },
  { title:"Principle, Shivaji College, DU Mr. Shiv Kumar Sahdev", img: "Principle, Shivaji College, DU Mr. Shiv Kumar Sahdev.jpg", alt: "Slide 4" },
  { title: "Principle, Hindu College, DU Ms. Anju Srivastava", img: "Principle, Hindu College, DU Ms. Anju Srivastava.jpg", alt: "Slide 5" },

  { title: "Principle, Bharati College, DU Ms. Mukti Sanyal", img: "Principle, Bharati College, DU Ms. Mukti Sanyal.jpg", alt: "Slide 7" },
  { title:"President of India, Shri Ram Nath Kovind", img: "President of India, Shri Ram Nath Kovind.JPG", alt: "Slide 8" },
  { title:"President of India, Shri Pranav Mukherjee", img: "President of India, Shri Pranav Mukherjee.jpg", alt: "Slide 9" },
  { title:"Formr Cabinet Minister Mr. Prakash JavadekarFormr Cabinet Minister Mr. Prakash Javadekar", img: "Formr Cabinet Minister Mr. Prakash Javadekar.jpg", alt: "Slide 10" },
  { title:"Former Deputy PM of India, Shri Lal Krishna Advani", img:"Former Deputy PM of India, Shri Lal Krishna Advani.jpg", alt: "Slide 11" },
  { title:"The Secular House Founders", img:"485767674_1185122856956976_7338635603558959400_n.jpg", alt: "Slide 12" }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const direction = useRef("right");

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    const nextIndex = (current + 1) % slides.length;

    setPrev(current);
    setCurrent(nextIndex);
    direction.current = "right";
    setIsAnimating(true);

    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, 800); // animation duration
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + slides.length) % slides.length;

    setPrev(current);
    setCurrent(prevIndex);
    direction.current = "left";
    setIsAnimating(true);

    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, 800);
  };

  const goToSlide = (index) => {
    if (index === current || isAnimating) return;

    direction.current = index > current ? "right" : "left";
    setPrev(current);
    setCurrent(index);
    setIsAnimating(true);

    setTimeout(() => {
      setPrev(null);
      setIsAnimating(false);
    }, 800);
  };

  // Touch swipe
  let touchStartX = 0;
  const onTouchStart = (e) => { touchStartX = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      className="hero-section"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-slider">
        {slides.map((slide, index) => {
          let className = "hero-slide";

          if (index === current && isAnimating) {
            className += direction.current === "right" ? " slide-in-right" : " slide-in-left";
          } else if (index === prev && isAnimating) {
            className += direction.current === "right" ? " slide-out-left" : " slide-out-right";
          } else if (index === current) {
            className += " active";
          }

          return (
            <div key={index} className={className}>
              <div className="hero-container">
                <div className="hero-left">
                  <h1>{slide.title}</h1>
                </div>
                <div className="hero-right">
                  <img src={slide.img} alt={slide.alt} className="slide-img" loading={index === 0 ? "eager" : "lazy"} />
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
