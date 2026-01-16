import React from "react";

const Loading = ({ message = "Loading, please wait..." }) => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.spinner}></div>
          <p style={styles.text}>{message}</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(245, 249, 255, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    backdropFilter: "blur(4px)",
  },

  card: {
    padding: "30px 38px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    textAlign: "center",
    minWidth: "260px",
  },

  spinner: {
    width: "46px",
    height: "46px",
    border: "4px solid #e3f2fd",
    borderTop: "4px solid #1e88e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px",
  },

  text: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#0d47a1",
  },
};

export default Loading;
