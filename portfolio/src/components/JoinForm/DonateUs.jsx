import React from "react";
import Footer from "../Footer/Footer";
import "./DonateUs.css";

const DonateUs = () => {
  return (
    <>
      <section className="donate-section">
        <div className="donate-container">
          <h2 className="donate-title">Support Secular House Foundation</h2>
          <p className="donate-subtitle">
            Your contribution helps us empower young voices and create a more inclusive society.
          </p>

          <div className="donate-details">
            <h3>Bank Details</h3>
            <p>
              <strong>Account Name:</strong> Secular House Foundation <br />
              <strong>Account Number:</strong> 50200102968331 <br />
              <strong>IFSC:</strong> HDFC0000248 <br />
              <strong>Bank:</strong> HDFC Bank
            </p>

            <h3>Our Address</h3>
            <p>
              RZ 44, Geetanjali Park, West Sagarpur, Sagar Pur, New Delhi, Delhi, 110046, India
            </p>
          </div>

          <a
            href="#"
            className="donate-btn"
            aria-label="Donate Now"
          >
            Donate Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default DonateUs;
