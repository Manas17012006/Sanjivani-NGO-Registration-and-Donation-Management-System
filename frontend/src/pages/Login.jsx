import React, { useState } from "react";
import heart from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Login.module.css";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Appcontext } from "../context/Appcontext";
import api from "../utilities/axios";
import Loading from "../components/Loading";
const Login = () => {
  const [mode, setMode] = useState("Signup");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { backendUrl,isAdminLogged,setIsAdminLogged } = useContext(Appcontext);
  const [load,setLoad]=useState(false);
  const [sendOtp,setSendOtp]=useState(false);
  //handlechange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  ////send verification otp////
  async function sendVerification()
  {
    setSendOtp(true);
    try{
        const {data}=await api.post(backendUrl+"/api/auth/send-otp",{});
        if(data.success)
        {
          toast.success(data.message);
          setSendOtp(false);
          navigate("/email-verify");
        }
        else
        {
          toast.error(data.message);
           setSendOtp(false);
        }
    }catch(err)
    {
      toast.error(err.message);
       setSendOtp(false);
    }
  }
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoad(true);
    if (mode === "Signup") {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          formData
        );
        if (data.success) {
          toast.success("Registered Successfully");
          setMode("Login");
           setLoad(false);
        } else {
          toast.error(data.message);
          setLoad(false);
        }
      } catch (err) {
        toast.error(err.message);
        setLoad(false);
      }
    }
    else
    {
      if(formData.email==="none48504@gmail.com" && formData.password==="January@2026")
      {
        navigate("/adminpanel");
        
        toast.success("Welcome Admin");
        setIsAdminLogged(true);
        console.log(isAdminLogged);
        return;
      }
      try{
        const {data}=await axios.post(backendUrl+"/api/auth/login",{email:formData.email,password:formData.password});
        if(data.success)
        {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          setLoad(false);
          await sendVerification();
        }
        else
        {
          toast.error(data.message);
          setLoad(false);
        }
      }catch(err)
      {
        toast.error(err.message);
        setLoad(false);
      }
    }
  };
  return (
    <div className={styles.loginPage}>
      {load && mode==="Signup" ? <Loading message="Registering, Please Wait"/> : null}
      {load && mode==="Login" ? <Loading message="Checking Info, Please Wait"/> : null}
      {sendOtp ? <Loading message="Sending OTP..."/> : null};
      <img
        src={heart}
        alt="logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      <div className={styles.loginCard}>
        <h2 className={styles.title}>
          {mode === "Signup" ? "Create Your Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {mode === "Signup" && (
            <input
              type="text"
              placeholder="Your Name"
              required
              minLength={3}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            minLength={5}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            {mode === "Signup" ? "Signup" : "Login"}
          </button>
        </form>

        {mode === "Signup" ? (
          <p className={styles.text}>
            Already have an account?{" "}
            <span className={styles.link} onClick={() => setMode("Login")}>
              Login here
            </span>
          </p>
        ) : (
          <p className={styles.text}>
            Don&apos;t have an account?{" "}
            <span className={styles.link} onClick={() => setMode("Signup")}>
              Signup here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
