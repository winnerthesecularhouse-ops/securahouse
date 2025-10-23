import React from "react";
import "./Founders.css";

const Founders = () => {
  const teamMembers = [
    {
        id: 1,
        name: "Sachin Bansal",
        role: "Co-Founder",
        image: "/aboutpic.png"
      },
    {
      id: 2,
      name: "Krishna Agrawal",
      role: "Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300"
    },
    

  ];

  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Founders</h2>
        <p className="team-subtitle">
          Meet the passionate team behind Secular House Foundation
        </p>

        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="team-image-container">
                <img src={member.image} alt={member.name} className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
