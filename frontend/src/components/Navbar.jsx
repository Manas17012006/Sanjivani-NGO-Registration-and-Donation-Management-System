import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";
import menu from "../assets/menu.png"
import { useNavigate } from "react-router-dom";
import Sidebarmenu from "./Sidebarmenu";
import { Appcontext } from "../context/Appcontext";
const Navbar = () => {
    const [ismenu,setMenu]=useState(false);
    const {isLoggedIn}=useContext(Appcontext);
    const navigate=useNavigate();
    function handleLogin()
    {
      if(isLoggedIn)
      {
        navigate("/user")
      }
      else
      {
        navigate("/login")
      }
    }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="NGOConnect Logo" />
      </div>

      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className={styles.actions}>
        <button className={styles.donate} onClick={(e)=>handleLogin(e)}>LOGIN / SIGNUP</button>
        {/* <button className={styles.admin} onClick={()=>navigate("/adminlogin")}>Admin Login</button> */}
      </div>
       <div className={styles.menu} onClick={()=>setMenu(!ismenu)}><img src={menu} alt="menu" width="50"/></div>
       <Sidebarmenu ismenu={ismenu} setMenu={setMenu}/>
    </nav>
  );
};

export default Navbar;
