import React, { useEffect, useContext, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Appcontext } from "../context/Appcontext";
import ShowDonor from "../components/ShowDonor";
import styles from "../css/DonorList.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const DonorList = () => {
  const { backendUrl,donationData, allUserData, getAllData, getAllUserData, deleteUser } =
    useContext(Appcontext);

  const [sort, setSort] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [includeZero, setIncludeZero] = useState(true);

  useEffect(() => {
    getAllData();
    getAllUserData();
  }, []);

  const userMap = useMemo(() => {
    const map = {};
    allUserData &&
      allUserData.forEach((user) => {
        map[user._id] = user;
      });
    return map;
  }, [allUserData]);

  const dummy = useMemo(() => {
    if (!allUserData) return [];

    return (
      allUserData &&
      allUserData.map((user) => {
        let totalDonation = 0;

        donationData &&
          donationData.map((d) => {
            if (d.userId === user._id && d.status === "success") {
              totalDonation += d.amount;
            }
          });

        return {
          userId: user._id,
          totalDonation,
          createdAt: user.createdAt,
        };
      })
    );
  }, [allUserData, donationData]);

  const filteredDummy = useMemo(() => {
    let data = [...dummy];
    const now = new Date();

    if (!includeZero) {
      data = data.filter((d) => d.totalDonation > 0);
    }

    if (sort === "low-high") {
      data.sort((a, b) => a.totalDonation - b.totalDonation);
    }

    if (sort === "high-low") {
      data.sort((a, b) => b.totalDonation - a.totalDonation);
    }

    if (dateFilter === "today") {
      data = data.filter(
        (d) => new Date(d.createdAt).toDateString() === now.toDateString()
      );
    }

    if (dateFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      data = data.filter((d) => new Date(d.createdAt) >= weekAgo);
    }

    if (dateFilter === "month") {
      data = data.filter((d) => {
        const date = new Date(d.createdAt);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      });
    }

    return data.map(({ userId, totalDonation }) => ({
      userId,
      totalDonation,
    }));
  }, [dummy, sort, dateFilter, includeZero]);

  const handleDelete = async (userId) => {
    const ok = window.confirm("Do you want to delete this user?");
    if (ok) {
        try{
      const {data}=await axios.post(backendUrl+"/api/user/deleteUser",{userId:userId});
      if(data.success)
      {
        toast.success(data.message);
        getAllData(); getAllUserData();
      }
      else
        {
            toast.error(data.message);
        }
    }catch(err)
    {
        toast.error(err.message);
    }
    }
  };

  const handleClick = async () => {
  const ok = window.confirm("Download User Data ?");
  if (!ok) return;

  try {
    const response = await axios.get(
      backendUrl + "/api/exportUser",
      {
        responseType: "blob" 
      }
    );
    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "userData.csv");

    document.body.appendChild(link);
    link.click();

    link.remove();
    toast.success("CSV downloaded successfully");

  } catch (err) {
    toast.error("Download failed");
  }
};


  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Donor List</h2>
          <button className={styles.exportBtn} title="Download user Data" onClick={(e)=>handleClick(e)}>
            Export
          </button>
        </div>
        <div className={styles.filters}>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort Donation</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>

          <select onChange={(e) => setDateFilter(e.target.value)}>
            <option value="">Registered</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <label className={styles.blue}>
            <input
              type="checkbox"
              checked={includeZero}
              onChange={() => setIncludeZero(!includeZero)}
            />
            Include users with <span className={styles.span}>No</span> Donations
          </label>
        </div>

        <div className={styles.tableWrapper}>
          <ShowDonor
            dummy={filteredDummy}
            userMap={userMap}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DonorList;
