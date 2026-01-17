import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utilities/axios";
export const Appcontext = createContext();

export const AppcontextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [userDonationData, setUserDonationData] = useState(false);
  const [donationData,setDonationData]=useState(false);
  const [allUserData,setAllUserData]=useState(false);
  const [isAdminLogged,setIsAdminLogged]=useState(false);
  async function getUserData() {
    try {
      const { data } = await api.post(backendUrl + "/api/user/getUserData", {});
      if (data.success) {
         setUserData(data.info);
         setIsLoggedIn(data.info.isVerified);
        console.log(isLoggedIn);
        console.log(`Logged in status is ${data.info.isVerified}`)
        console.log(data.info);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  //get user's donation history
  async function getUserDonation() {
    try {
      const { data } = await api.post(
        backendUrl + "/api/user/getAllDonations",
        {}
      );
      if (data.success) {
        setUserDonationData(data.info);
        console.log(data.info);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  //get all the donation history
  async function getAllData() {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/getAllData",
        {}
      );
      if (data.success) {
        setDonationData(data.info);
        console.log(data.info);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  //get all the user's data
  async function getAllUserData()
  {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/getAllUsers",
        {}
      );
      if (data.success) {
        setAllUserData(data.info);
        console.log(data.info);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  useEffect(() => {
    getUserData();
    getUserDonation();
    getAllData();
    getAllUserData();
  }, []);
  useEffect(() => {
  console.log(" isLoggedIn UPDATED →", isLoggedIn);
}, [isLoggedIn]);

  const value = {
    backendUrl,
    userData,
    setUserData,
    getUserData,
    isLoggedIn,
    setIsLoggedIn,
    userDonationData,
    setUserDonationData,
    getUserDonation,
    donationData,setDonationData,getAllData,
    allUserData,setAllUserData,getAllUserData,
    isAdminLogged,setIsAdminLogged
  };
  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};
