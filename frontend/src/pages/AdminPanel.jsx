import React, { useEffect, useContext, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Appcontext } from "../context/Appcontext";
import { IndianRupee, HeartHandshake, Users } from "lucide-react";
import styles from "../CSS/AdminPanel.module.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [total, setTotal] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [registrations, setRegistrations] = useState(0);
  const navigate=useNavigate();
  const {
    donationData,
    getAllData,
    allUserData,
    getAllUserData,
  } = useContext(Appcontext);

  useEffect(() => {
    if (donationData.length === 0) getAllData();
    if (allUserData.length === 0) getAllUserData();
  }, []);

  useEffect(() => {
    let sum = 0;
    donationData && donationData.forEach((item) => {
      if (item.status === "success") {
        sum += item.amount;
      }
    });
    setTotal(sum);
    setTotalDonation(donationData.length);
  }, [donationData]);

  useEffect(() => {
    setRegistrations(allUserData.length);
  }, [allUserData]);

  return (
    <div className={styles.container}>
      <AdminSidebar />

      <div className={styles.cardsWrapper}>

        <div className={styles.card}>
          <div
            className={styles.iconBox}
            style={{ backgroundColor: "#EEF4FF" }}
          >
            <IndianRupee size={22} color="#3B82F6" />
          </div>
          <p className={styles.title}>Total Amount</p>
          <h2 className={styles.value}>₹ {total}</h2>
          <p className={styles.link} onClick={()=>navigate("/donationdata")}>See total collections</p>
        </div>

        <div className={styles.card}>
          <div
            className={styles.iconBox}
            style={{ backgroundColor: "#FFF4E5" }}
          >
            <HeartHandshake size={22} color="#F97316" />
          </div>
          <p className={styles.title}>Total Donations</p>
          <h2 className={styles.value}>{totalDonation}</h2>
          <p className={styles.link} onClick={()=>navigate("/donorlist")}>View donation history</p>
        </div>

        <div className={styles.card}>
          <div
            className={styles.iconBox}
            style={{ backgroundColor: "#ECFDF5" }}
          >
            <Users size={22} color="#10B981" />
          </div>
          <p className={styles.title}>Registrations</p>
          <h2 className={styles.value}>{registrations}</h2>
          <p className={styles.link} onClick={()=>navigate("/donorlist")}>See all users</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
