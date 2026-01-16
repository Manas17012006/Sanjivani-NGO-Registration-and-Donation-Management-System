import React from "react";
import styles from "../CSS/Initiatives.module.css";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Initiatives = () => {
  return (
    <div>
    <Navbar/>
    <section className={styles.initiatives}>
      <h2 className={styles.heading}>Our Initiatives</h2>
      <p className={styles.subheading}>
        Creating meaningful impact through compassion, responsibility, and
        community participation.
      </p>

      <div className={styles.campaign}>
        <img src={img1} alt="Education for All" />
        <div className={styles.content}>
          <h3>Education for All</h3>
          <p>
            Sanjivani believes education is the foundation of a stronger society.
            Through learning support programs and awareness initiatives, we work
            to ensure every child has access to knowledge and opportunity.
          </p>
        </div>
      </div>

      <div className={`${styles.campaign} ${styles.reverse}`}>
        <img src={img2} alt="Clean & Green Communities" />
        <div className={styles.content}>
          <h3>Clean & Green Communities</h3>
          <p>
            We promote cleanliness and environmental responsibility through
            community drives, awareness programs, and collective action for a
            healthier and sustainable future.
          </p>
        </div>
      </div>

      <div className={styles.campaign}>
        <img src={img4} alt="Health & Well-Being" />
        <div className={styles.content}>
          <h3>Health & Well-Being</h3>
          <p>
            Sanjivani focuses on improving physical and mental well-being through
            health awareness initiatives and support programs aimed at building
            healthier communities.
          </p>
        </div>
      </div>

      <div className={`${styles.campaign} ${styles.reverse}`}>
        <img src={img3} alt="Community Empowerment" />
        <div className={styles.content}>
          <h3>Community Empowerment</h3>
          <p>
            We work towards empowering individuals through skill development,
            awareness, and participation, enabling communities to grow
            self-reliant and resilient.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default Initiatives;
