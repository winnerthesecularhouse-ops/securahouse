import React, { useEffect, useState } from "react";
import "./AllAchievers.css";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://portfolio-x0gj.onrender.com/api/achievers";

const AllAchievers = () => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const res = await axios.get(API_URL);
        setAchievers(res.data || []);
      } catch (e) {
        console.error("Failed to load achievers", e);
        setAchievers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievers();
  }, []);

  return (
    <section className="all-achievers" aria-label="All Achievers">
      <div className="container">
        <div className="header">
          <h1>All Achievers</h1>
          <p className="subtitle">Celebrating excellence of our students</p>
          <Link to="/" className="back-home">← Back to Home</Link>
        </div>

        {loading ? (
          <div style={{ padding: "1rem" }}>Loading...</div>
        ) : achievers.length === 0 ? (
          <div style={{ padding: "1rem" }}>No achievers yet.</div>
        ) : (
          <div className="achievers-grid">
            {achievers.map((story) => (
              <div key={story._id} className="achiever-card">
                <div className="image-wrap">
                  <img src={story.image} alt={story.name} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllAchievers;