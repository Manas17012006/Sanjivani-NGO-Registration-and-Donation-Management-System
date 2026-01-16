import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactTop}>
        <h3>Get in Touch</h3>
        <p>For any queries or information, feel free to reach out to us.</p>

        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Query"></textarea>
          <button type="button">Submit</button>
        </form>
      </div>

      <div className={styles.main}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2>
            <span className={styles.ngo}>SAN</span>
            <span className={styles.connect}>JIVANI</span>
          </h2>
          <p>
            A transparent platform that connects people with meaningful
            causes and ensures ethical donation handling.
          </p>
        </div>
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>+91 98765 43210</p>
          <p>support@sanjivani.org</p>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} SANJIVANI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
