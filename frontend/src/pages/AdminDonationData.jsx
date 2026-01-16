import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import ShowIndividualAdminDonations from "../components/ShowIndividualAdminDonations";
import styles from "../CSS/AdminDonationData.module.css";

const AdminDonationData = () => {
  const { donationData, getAllData, allUserData, getAllUserData }=useContext(Appcontext);
  useEffect(() => {
    if (donationData.length === 0) getAllData();
    if (allUserData.length === 0) getAllUserData();
  }, []);
  const [total,setTotal]=useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  useEffect(()=>{
    let x=0;
    if(donationData)
    {
        donationData.forEach(ele => {
          if(ele.status==="success")x+=ele.amount;
        });
    }
    setTotal(x);
  },[donationData]);
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <div className={styles.content}>
        <h2 className={styles.title}>Donation History</h2>

        <div className={styles.filterBar}>
          <select onChange={(e) => setPaymentStatus(e.target.value)}>
            <option value="">Payment Status</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <h2 styles={{padding:"10px"}}>Total Donated Amount :₹ {total}</h2>
        <div className={styles.listContainer}>
          {donationData &&
            donationData.map((item) => {
              if (paymentStatus === "Success" && item.status === "success") {
                return (
                  <ShowIndividualAdminDonations key={item._id} item={item} />
                );
              } else if (
                paymentStatus === "Failed" &&
                item.status === "pending"
              ) {
                return (
                  <ShowIndividualAdminDonations key={item._id} item={item} />
                );
              } else if (paymentStatus === "") {
                return (
                  <ShowIndividualAdminDonations key={item._id} item={item} />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminDonationData;
