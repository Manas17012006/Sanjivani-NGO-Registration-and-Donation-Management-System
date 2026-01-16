import React, { useContext, useEffect, useState } from "react";
import home from "../assets/home.png";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Appcontext } from "../context/Appcontext";
const words = ["Action", "Service", "Hope for the Future"];

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const navigate = useNavigate();
  const {isLoggedIn,setIsLoggedIn}=useContext(Appcontext);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < words[wordIndex].length) {
        setText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
      }
    }, 120);

    return () => clearTimeout(timeout);
  }, [charIndex, wordIndex]);

  return (
    <div>
      <Navbar />
      <section className={styles.home}>
        <div className={styles.content}>
          <h1>
            Connecting Communities <br />
            <span>With Purpose</span>
          </h1>

          <p className={styles.typewriter}>
            {text}
            <span className={styles.cursor}>|</span>
          </p>
          <button className={styles.donate} onClick={() => navigate("/initiatives")}>
            Our Initiatives
          </button>
        </div>

        <div className={styles.image}>
          <img src={home} alt="Community Support" />
        </div>
      </section>
      <section>
        <div className={styles.bigdiv}>
          <div className={styles.div2}>
            <div className={styles.div1}>Community Welfare</div>
            Sanjivani works to support individuals and communities through
            responsible and inclusive initiatives.
          </div>

          <div className={styles.div2}>
            <div className={styles.div1}>Social Responsibility</div>
            We encourage citizens to actively participate in creating positive
            and lasting social change.
          </div>

          <div className={styles.div2}>
            <div className={styles.div1}>Transparency & Trust</div>
            Every action taken by Sanjivani is guided by honesty,
            accountability, and public trust.
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
