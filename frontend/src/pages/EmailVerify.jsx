import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import heart from "../assets/logo.png";
import styles from "../CSS/EmailVerify.module.css";
import { toast } from "react-toastify";
import api from "../utilities/axios";
import { Appcontext } from "../context/Appcontext";
import Loading from "../components/Loading";
const EmailVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [load,setLoad]=useState(false);
  const {backendUrl,isLoggedIn,setIsLoggedIn}=useContext(Appcontext);
  const inputsRef = useRef([]);
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });

    inputsRef.current[newOtp.length - 1].focus();
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try{
        const {data}=await api.post("/api/auth/verifyEmail",{otp:otp.join("")});
        console.log(otp.join());
        if(data.success)
        {
            toast.success(data.message);
            setLoad(false);
            setIsLoggedIn(true);
            navigate("/user");
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
  };

  return (
    <div className={styles.container}>
      {load ? <Loading message="Verifying OTP..."/> : null}
      <img
        src={heart}
        alt="logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />

      <div className={styles.card}>
        <h2 className={styles.title}>Verify Your Email</h2>
        <p className={styles.subtitle}>
          We’ve sent a 6-digit OTP to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className={styles.otpContainer}
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className={styles.otpInput}
              />
            ))}
          </div>

          <button type="submit" className={styles.button}>
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
};

export default EmailVerify;
