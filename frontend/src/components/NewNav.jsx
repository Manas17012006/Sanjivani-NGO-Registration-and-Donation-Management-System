import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.svg";
import logo from "../assets/logo.png";
import styles from "../CSS/User.module.css";
import { Appcontext } from "../context/Appcontext";
import { NavLink } from "react-router-dom";
const NewNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(Appcontext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      {/* Left */}
      <div className={styles.left}>
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate("/")}
        />
      </div>

      {/* Center */}
      <div className={styles.center}>
        <span onClick={() => navigate("/initiatives")}>Initiatives</span>
        <span onClick={() => navigate("/about")}>About</span>
      </div>

      {/* Right */}
      <div className={styles.right}>
        <span className={styles.welcome}>Welcome 👋</span>

        <div className={styles.profileBox}>
          <img
            src={profile}
            alt="profile"
            className={styles.profile}
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className={styles.dropdown}>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                My Profile
              </NavLink>

              <NavLink
                to="/donationHistory"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Donation History
              </NavLink>

              <div
                className={`${styles.link} ${styles.logout}`}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewNav;
