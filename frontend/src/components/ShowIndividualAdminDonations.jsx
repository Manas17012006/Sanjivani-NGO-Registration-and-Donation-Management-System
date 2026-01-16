import React, { useEffect, useContext, useMemo } from "react";
import { Appcontext } from "../context/Appcontext";

const ShowIndividualAdminDonations = ({ item }) => {
  const { donationData, getAllData, allUserData, getAllUserData } =
    useContext(Appcontext);

  useEffect(() => {
    if (donationData && donationData.length === 0) getAllData();
    if (allUserData && allUserData.length === 0) getAllUserData();
  }, []);

  const user = useMemo(() => {
    if (!allUserData || !item?.userId) return null;
    return allUserData.find((u) => u._id === item.userId);
  }, [allUserData, item]);

  if (!item) return null;

  const statusLabel =
    item.status === "success" ? "Success" : "Failed";

  const statusColor =
    item.status === "success" ? "#16a34a" : "#dc2626";

  const transactionTime = item.createdAt
    ? new Date(item.createdAt).toLocaleString()
    : "N/A";

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "14px 16px",
        marginBottom: "12px",
        background: "#ffffff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ marginBottom: "6px" }}>
        <strong>Name:</strong> {user?.name || "Unknown User"}
      </div>

      <div style={{ marginBottom: "6px" }}>
        <strong>Email:</strong> {user?.email || "N/A"}
      </div>

      <div style={{ marginBottom: "6px" }}>
        <strong>Transaction Time:</strong> {transactionTime}
      </div>

      <div style={{ marginBottom: "6px" }}>
        <strong>Amount:</strong> ₹ {item.amount}
      </div>

      <div style={{ color: statusColor, fontWeight: 600 }}>
        <strong>Status:</strong> {statusLabel}
      </div>
    </div>
  );
};

export default ShowIndividualAdminDonations;
