import ShowIndividualDonor from "./ShowIndividualDonor";

const ShowDonor = ({ dummy, userMap, onDelete }) => {
  if (!dummy.length) {
    return <p style={{ padding: "12px" }}>No donors found</p>;
  }

  return (
    <div style={{ minWidth: "900px" }}>
      {/* Table Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 2fr 1.5fr 1fr",
          background: "#f9fafb",
          padding: "12px",
          fontWeight: "600",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div>Name</div>
        <div>Email</div>
        <div>Registered At</div>
        <div>Total Donated</div>
        <div>Action</div>
      </div>

      {/* Rows */}
      {dummy.map((item) => (
        <ShowIndividualDonor
          key={item.userId}
          donor={item}
          user={userMap[item.userId]}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ShowDonor;
