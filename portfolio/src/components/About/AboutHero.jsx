import React from "react";
import "./AboutHero.css";
import aboutImg from "../../assets/about.jpg";
import { NavLink } from "react-router-dom";

const AboutHero = () => {
  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="about-heading"
      role="region"
    >
      <div className="about-container">
        {/* Left Image */}
        <figure className="about-image">
          <img
            src={aboutImg}
            alt="NGO volunteers helping underprivileged children"
            loading="lazy"
          />
        </figure>

        {/* Right Text */}
        <article className="about-content">
          <h2 id="about-heading">About Secular House Foundation</h2>

          <p>
            <strong>Secular House Foundation</strong>, founded in 2019 by Krishna Agrawal and Sachin Bansal, is a youth-led non-profit organization committed to promoting <strong>literacy</strong>, <strong>inclusivity</strong>, and <strong>social harmony</strong>. Guided by our motto <em>“Read, Write, and Recite”</em>, we empower young voices through cultural, educational, and social initiatives.
          </p>

          <p>
            We have organized impactful <strong>open mic competitions</strong>, <strong>workshops</strong>, and <strong>awareness programs</strong> in collaboration with leading Delhi University colleges such as Bharti College, Shivaji College, Hindu College, Bhaskaracharya College of Applied Sciences, Maitreyi College, and Delhi College of Arts and Commerce, among others.
          </p>

          <p>
            By fostering <strong>creativity</strong>, <strong>dialogue</strong>, and <strong>community engagement</strong>, Secular House Foundation envisions a society that is equitable, expressive, and compassionate.
          </p>

          <NavLink to="/donateus" className="about-btn" aria-label="Donate Us">
            Donate Us
          </NavLink>
        </article>
      </div>
    </section>
  );
};

export default AboutHero;
