import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  HeartHandshake,
  Database,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";

export default function AdminSidebar() {
  const {isAdminLogged,setIsAdminLogged}=useContext(Appcontext);
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  function handleLogout(e)
  {
    navigate("/");
    setIsAdminLogged(false);
  }
  return (
    <>
  
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .menu-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1001;
          background: #fff;
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          display: none;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: #ffffff;
          border-right: 1px solid #ddd;
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          margin-left:50px;
        }

        .sidebar-header h1 {
          color: #2563eb;
          font-size: 22px;
        }

        .nav {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: #555;
        }

        .nav-link:hover {
          background: #f1f5f9;
        }

        .nav-link.active {
          background: #e0e7ff;
          color: #2563eb;
        }

        .logout {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border: none;
          background: none;
          color: #dc2626;
          cursor: pointer;
          border-radius: 10px;
        }

        .logout:hover {
          background: #fee2e2;
        }

        @media (max-width: 768px) {
          .menu-btn {
            display: block;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>Admin Panel</h1>
        </div>

        <nav className="nav">
          <NavLink to="/adminpanel" className="nav-link">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/donorlist" className="nav-link">
            <HeartHandshake size={20} />
            Donors
          </NavLink>

          <NavLink to="/donationdata" className="nav-link">
            <Database size={20} />
            Donation Data
          </NavLink>
        </nav>

        <button className="logout" onClick={(e)=>handleLogout(e)}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
}
