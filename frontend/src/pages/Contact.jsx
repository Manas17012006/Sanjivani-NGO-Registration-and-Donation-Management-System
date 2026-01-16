import React from "react";
import contactImg from "../assets/image.png";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
const Contact = () => {
  return (
    <div>
      <Navbar/>
    <div
      style={{
        marginTop: "70px",
        padding: "60px 80px 20px",
        background: "#f9fcff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "700",
          color: "#2f80ed",
          marginBottom: "50px",
        }}
      >
        CONTACT US
      </div>

      <div
        style={{
          display: "flex",
          gap: "60px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <img
          src={contactImg}
          alt="contact"
          style={{
            width: "420px",
            maxWidth: "100%",
          }}
        />
        <div
          style={{
            background: "#ffffff",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            maxWidth: "420px",
          }}
        >
          <h3 style={{ color: "#27ae60", marginBottom: "10px" }}>
            Our Office
          </h3>
          <p>Green Valley Park, MG Road</p>
          <p>Andheri East, Mumbai, India</p>

          <h4 style={{ marginTop: "20px", color: "#2f80ed" }}>
            Visiting Hours
          </h4>
          <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
          <p>Saturday: 10:00 AM – 4:00 PM</p>
          <p>Sunday: Closed</p>

          <h4 style={{ marginTop: "20px", color: "#2f80ed" }}>
            Contact
          </h4>
          <p> +91 9999990002020</p>
          <p> support@sanjivani.org</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
