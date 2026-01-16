import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import { Appcontext } from "../context/Appcontext";
import profilePic from "../assets/profile.svg";
import api from "../utilities/axios";
import { toast } from "react-toastify";
import NewNav from "../components/NewNav";
import Loading from "../components/Loading";
const Profile = () => {
  const { userData, getUserData,backendUrl } = useContext(Appcontext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [load,setLoad]=useState(false);
  useEffect(() => {
    if (!userData) {
      getUserData();
    } else {
      setName(userData.name);
    }
  }, []);

  const handleSave = async () => {
    setLoad(true);
    try
    {
        const {data}=await api.post(backendUrl+"/api/user/changeName",{name:name});
        if(data.success)
        {
            toast.success("Changes Saved")
            setLoad(false);
            getUserData();
        }
        else
        {
            toast.error(data.message);
            setLoad(false);
        }
        setEditing(false);
    }catch(err)
    {
        setEditing(false);
        setLoad(false);
        toast.error(err.message);
    }
  };

  if (!userData) return null;

  return (
    <>
      <NewNav/>
      {load ? <Loading message="Saving Changes..."/> : null}
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <img src={profilePic} alt="profile" style={styles.avatar} />

            <div>
              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              ) : (
                <h2 style={styles.name}>{userData.name}</h2>
              )}
              <p style={styles.email}>{userData.email}</p>
            </div>
          </div>

          <div style={styles.meta}>
            <div>
              <span style={styles.metaLabel}>Registered On</span>
              <p style={styles.metaValue}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <span style={styles.metaLabel}>Last Updated</span>
              <p style={styles.metaValue}>
                {new Date(userData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div style={styles.actions}>
            {editing ? (
              <button style={styles.saveBtn} onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button
                style={styles.editBtn}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
    padding: "20px",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "480px",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#f1f5ff",
    padding: "10px",
  },

  name: {
    margin: 0,
    fontSize: "22px",
    color: "#1f2937",
  },

  email: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
    marginBottom: "25px",
  },

  metaLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  metaValue: {
    fontSize: "14px",
    fontWeight: "500",
    marginTop: "4px",
  },

  actions: {
    textAlign: "center",
  },

  editBtn: {
    padding: "10px 22px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    background: "linear-gradient(135deg, #60a5fa, #2563eb)",
    color: "#fff",
  },

  saveBtn: {
    padding: "10px 22px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
  },

  input: {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },
};
