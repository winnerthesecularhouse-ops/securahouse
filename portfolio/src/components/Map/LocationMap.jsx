import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./LocationMap.css";

const LocationMap = () => {
  const googleMapLink =
    "https://maps.google.com/?q=RZ+44,+Geetanjali+Park,+West+Sagarpur,+Sagar+Pur,+New+Delhi,+Delhi,+110046";

  const addressLines = [
    "RZ 44, Geetanjali Park, West Sagarpur, Sagar Pur",
    "New Delhi, Delhi, 110046",
    "India",
  ];

  return (
    <section className="location-map-section" aria-label="Map showing our location">
      <h2 className="map-heading">Find Us Here</h2>
      <div className="map-wrapper">
        <div className="map-address">
          <div className="map-header">
            <FaMapMarkerAlt className="map-icon" />
            <div className="address">
              {addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div
          className="map-iframe-container"
          onClick={() => window.open(googleMapLink, "_blank")}
        >
          <iframe
            title="Google Maps"
            src="https://maps.google.com/maps?q=RZ+44,+Geetanjali+Park,+West+Sagarpur,+Sagar+Pur,+New+Delhi,+Delhi,+110046&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
