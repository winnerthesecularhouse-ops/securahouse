import React from "react";
import "./NGOGallery.css";
import { NavLink } from "react-router-dom";

const NGOGallery = () => {
  const images = [
    { 
      src: "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/494375129_1222682703200991_2866401022821973364_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lwQWF8ZCiAIQ7kNvwHRhSa3&_nc_oc=AdkBB_88YDqenneh0k7ua-KjRg0wB0MwYiXhD0jEjCxInjHhUuMd3nJJOXv5V0W8jgmt2miNRlOjnL21G67l_kNB&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=yoxxQXpwy5v7W5gYDpxM9Q&oh=00_Affmt_kyp-DqJZle9rIoOO2UbzelXQ14n9CPzm4Nij0aNQ&oe=68FF9265", 
      quote: "Together we can make a difference in the world." 
    },
    { 
      src: "https://scontent.fdel11-2.fna.fbcdn.net/v/t39.30808-6/494700098_1223166906485904_5472311095547563655_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KrIesg5m7BoQ7kNvwG6sZFq&_nc_oc=AdlHcbWuSDCP_m8ZBikreM5rIZByKaAvoKJ3BsCaIQltFz4eJFPQT6yVIW6qB6PcwjtwCEq4d6tRZL8sdycmDeRi&_nc_zt=23&_nc_ht=scontent.fdel11-2.fna&_nc_gid=McfVb6AVLuvspFG6I2hFHA&oh=00_AfcjVILBIZ4YWJAHccKm00absLygjGFzsDWcBlpq8u0qzw&oe=68FFB2D6", 
      quote: "Empowering communities, one step at a time." 
    },
    { 
      src: "https://scontent.fdel11-4.fna.fbcdn.net/v/t39.30808-6/494892112_1222682316534363_2900100266680301428_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Wu5T9zjEtKQQ7kNvwE6VVpf&_nc_oc=AdkFnR2TKwTSb5Mu5lrJUAEeRIFhzgUfZc2DCzP-YJLUWVa0SVW9p6-GZf4iKZZJGEjWv--HFjhPWUzbnS8_Dbdw&_nc_zt=23&_nc_ht=scontent.fdel11-4.fna&_nc_gid=5Xb1n55gFmHZpEab0QB7lw&oh=00_AfcT2bsQyZXBQwoxuurV6EavYK6Llz7oovz0k5XmjigxmQ&oe=68FF939A", 
      quote: "Hope grows where kindness flows endlessly." 
    },
    { 
      src: "https://scontent.fdel11-3.fna.fbcdn.net/v/t39.30808-6/494357239_1223166699819258_4346010124073383895_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=k9CTXyb1H2cQ7kNvwHEev9O&_nc_oc=AdmRzakhzFmhkYRB9fwyDF_rv_t3XzXox19QbEmWMr457fYFOLj2Ht0hGmQKdzgi_eGDDGQR5836xBxUE996J1k-&_nc_zt=23&_nc_ht=scontent.fdel11-3.fna&_nc_gid=rP5iWY0r0CLz8vOIkYoMzA&oh=00_AfeGl-OJqWUYhtrB3ae_VLuFNxM9vXg2kEuT1LYkv9Hyjg&oe=68FFC08A", 
      quote: "Join hands to create positive change." 
    },
    { 
      src: "https://scontent.fdel3-1.fna.fbcdn.net/v/t39.30808-6/494951240_1222682649867663_2266257773810374066_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=R12W1kF5dy8Q7kNvwEx8dF2&_nc_oc=Adl-ZAPs9o1hhtQc7uV0ZKPrEoo_O7qgSCc9G09aB0e1N2e9_NI2hbvcW5TKwLI3sx4&_nc_zt=23&_nc_ht=scontent.fdel3-1.fna&_nc_gid=CYakNHPxgu-kwiHgatF9Jg&oh=00_AfcxZKan7jRTV1wn3eguG-uaUIXY_YJO3I1DFIlmAMPHNw&oe=68FFCEA3", 
      quote: "Your support shapes brighter futures." 
    },
    { 
      src: "https://scontent.fdel11-1.fna.fbcdn.net/v/t1.6435-9/141587915_432466371512450_2781008782651890952_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=2le8Oxb5L7IQ7kNvwF-pq0v&_nc_oc=AdndHJDx8xKelEoL4f8vVgEkrX-X5QkpbADUuiaJJBBttacfvs_2TVhDPD4P8ciUHSKZHuDiCkKUH0H7Fa4fkFep&_nc_zt=23&_nc_ht=scontent.fdel11-1.fna&_nc_gid=3duyxb18_Dj-MHnGYCLQ8A&oh=00_AfdzGeRCgv55P__tj8yiErJQ8iDzYVvA89Fy2xMb5vy6gQ&oe=692168A1", 
      quote: "Small acts multiplied by millions transform the world." 
    }
  ];

  const handleJoinClick = () => {
    alert("Thank you for your interest in joining our team! We'll contact you soon.");
    // You can replace this with actual navigation or form opening
  };

  return (
    <section className="ngo-gallery">
      <h2 className="gallery-title">Our Mission in Action</h2>
      <p className="gallery-subtitle">
        At Secular House Foundation, we're creating positive change through community 
        empowerment and sustainable development. See our work and consider joining our 
        dedicated team of changemakers.
      </p>

      <div className="gallery-layout">
        {/* Left side: 3 big images */}
        <div className="left-images">
          {images.slice(0, 3).map((item, index) => (
            <div key={index} className="big-image">
              <img src={item.src} alt={`NGO work ${index + 1}`} />
              <div className="overlay">
                <p className="quote-text">"{item.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: 3 smaller images */}
        <div className="right-images">
          {images.slice(3).map((item, index) => (
            <div key={index} className="small-image">
              <img src={item.src} alt={`NGO work ${index + 4}`} />
              <div className="overlay">
                <p className="quote-text">"{item.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-container">
        <NavLink to="/donateus" className="join-button">
          Donate Us
        </NavLink>
      </div>
    </section>
  );
};

export default NGOGallery;