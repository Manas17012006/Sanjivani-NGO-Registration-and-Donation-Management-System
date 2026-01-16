import React from "react";
import styles from "./Sidebarmenu.module.css";
import { NavLink, useNavigate } from "react-router";
const Sidebarmenu = ({ ismenu, setMenu }) => {
  const navigate=useNavigate();
  return (
    <div className={ismenu ? styles.bigdiv : styles.nodisplay}>
      <div onClick={() => setMenu(false)} className={styles.back}>
        <span className={styles.span}>{"<"}</span> Back
      </div>
      <NavLink
        onClick={() => setMenu(false)}
        to="/"
        end
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        onClick={() => setMenu(false)}
        to="/about"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        About
      </NavLink>
      <NavLink
        onClick={() => setMenu(false)}
        to="/contact"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Contact
      </NavLink>
      <div className={styles.actions}>
        <button className={styles.donate} onClick={()=>navigate("/login")}>LOGIN / SIGNUP</button>
        {/* <button className={styles.admin} onClick={()=>navigate("/adminlogin")}>Admin Login</button> */}
      </div>
    </div>
  );
};

export default Sidebarmenu;
