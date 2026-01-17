const ShowIndividualDonor = ({ donor, user, onDelete }) => {
  if (!user) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr 2fr 1.5fr 1fr",
        padding: "12px",
        borderBottom: "1px solid #e5e7eb",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 500 }}>{user.name}</div>

      {/* EMAIL FIX */}
      <div
        style={{
          color: "#2563eb",
          wordBreak: "break-all",
          overflowWrap: "anywhere",
          whiteSpace: "normal",
        }}
      >
        {user.email}
      </div>

      <div style={{ color: "#6b7280" }}>
        {new Date(user.createdAt).toLocaleDateString()}
      </div>

      <div style={{ fontWeight: 600 }}>
        ₹ {donor.totalDonation}
      </div>

      <button
        onClick={() => onDelete(donor.userId)}
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          border: "none",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ShowIndividualDonor;
