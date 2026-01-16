import React from "react";
import styles from "./About.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <section className={styles.bigdiv}>
        <h1>
          About <span className={styles.gr}>SAN</span>
          <span className={styles.blue}>JIVANI</span>
        </h1>
        <p>Serving Humanity • Strengthening Communities</p>
      </section>

      <section className={styles.section}>
        <div className={styles.textBlock}>
          <h2>Who Are We?</h2>
          <p>
            Sanjivani is a non-governmental organization committed to uplifting
            communities and supporting individuals through compassionate,
            ethical, and responsible social initiatives.
          </p>
          <p>
            We believe that meaningful change begins with collective effort.
            Guided by values of trust, inclusivity, and accountability, Sanjivani
            works to address social challenges and promote long-term community
            well-being.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.altBg}`}>
        <h2 className={styles.center}>Our Focus Areas</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Community Welfare</h3>
            <p>
              Supporting initiatives that improve access to basic needs such as
              education, healthcare, and social support for underserved
              communities.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Public Participation</h3>
            <p>
              Encouraging citizens to actively engage in social responsibility
              through volunteering, awareness, and collaborative action.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Ethical Impact</h3>
            <p>
              Ensuring transparency, accountability, and integrity in all our
              activities to build lasting public trust.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.textBlock}>
          <h2>Our Aim</h2>
          <p>
            Sanjivani aims to create a sustainable and inclusive ecosystem where
            social responsibility drives positive change. Our goals include:
          </p>

          <ul className={styles.list}>
            <li>Strengthening communities through responsible initiatives</li>
            <li>Encouraging active civic and social engagement</li>
            <li>Promoting transparency and ethical practices</li>
            <li>Creating measurable and long-term social impact</li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
