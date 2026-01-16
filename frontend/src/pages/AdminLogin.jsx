import React, { useState } from "react";
import logo from "../assets/logo.png"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAdminLogged,setIsAdminLogged}=useContext(Appcontext);
    const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email==="none48504@gmail.com" && password==="January@2026")
    {
        toast.success("Login Successfull")
        setIsAdminLogged(true);
        navigate("/adminpanel");
    }
    else
    {
        toast.error("Invalid Admin Credentials")
    }
  };

  return (
    <div style={styles.container}>
        <img src={logo} alt="alt" style={styles.image}/>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Access admin dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

const styles = {
    image:{
        width:"240px",
        position:"fixed",
        top:"10px",
        left:"5px"
    },
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
    padding: "20px",
  },
  card: {
    width: "360px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#475569",
    marginBottom: "22px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
