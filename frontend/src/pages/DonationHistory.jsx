import React, { useContext, useEffect } from "react";
import NewNav from "../components/NewNav";
import { Appcontext } from "../context/Appcontext";

const DonationHistory = () => {
  const { userDonationData, getUserDonation } = useContext(Appcontext);

  useEffect(() => {
    getUserDonation();
  }, []);

  let totalDonation = 0;
  if (userDonationData) {
    for (let i = 0; i < userDonationData.length; i++) {
      if (userDonationData[i].status === "success") {
        totalDonation += userDonationData[i].amount;
      }
    }
  }

  return (
    <>
      {/* ✅ Sidebar */}
      <NewNav />

      {/* ✅ Page content starts AFTER sidebar */}
      <div style={styles.page}>
        <h2 style={styles.heading}>Donation History</h2>
        <h3 style={styles.subHeading}>
          Total Donation : ₹ {totalDonation}
        </h3>

        {userDonationData && userDonationData.length === 0 && (
          <p style={styles.empty}>No donations yet</p>
        )}

        <div style={styles.list}>
          {userDonationData &&
            userDonationData.map((item) => {
              const isSuccess = item.status === "success";
              return (
                <div key={item._id} style={styles.card}>
                  <div style={styles.top}>
                    <span style={styles.amount}>₹ {item.amount}</span>

                    <span
                      style={{
                        ...styles.status,
                        background: isSuccess ? "#e8f5e9" : "#ffebee",
                        color: isSuccess ? "#2e7d32" : "#c62828",
                      }}
                    >
                      {isSuccess ? "Success" : "Failed"}
                    </span>
                  </div>

                  <div style={styles.meta}>
                    <span>
                      <strong>Payment ID:</strong>{" "}
                      {item.paymentIntentId.slice(0, 12)}...
                    </span>
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #f8fbff)",

    marginLeft: "70px", 
    padding: "20px",
    marginTop:"150px",
    overflowX: "hidden",
  },

  heading: {
    textAlign: "center",
    margin: "20px 0 10px",
    fontSize: "28px",
    color: "#0d47a1",
  },

  subHeading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "20px",
    color: "#1a237e",
  },

  empty: {
    textAlign: "center",
    color: "#555",
  },

  list: {
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    padding: "0 16px",
  },

  card: {
    background: "#fff",
    padding: "18px 22px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  amount: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a237e",
  },

  status: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  meta: {
    fontSize: "13px",
    color: "#555",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
};

export default DonationHistory;
