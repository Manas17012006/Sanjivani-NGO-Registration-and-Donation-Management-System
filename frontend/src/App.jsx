import { useContext, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import User from './pages/User';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Initiatives from './pages/Initiatives';
import { Appcontext } from './context/Appcontext';
import Profile from './pages/Profile';
import DonationHistory from './pages/DonationHistory';
import DonorList from './pages/DonorList';
import AdminDonationData from './pages/AdminDonationData';

function App() {
 const {isLoggedIn,setIsLoggedIn,isAdminLogged,setIsAdminLogged}=useContext(Appcontext);
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={!isLoggedIn?<Login/>:<Navigate to="/user"/>}/>
        <Route path="/email-verify" element={<EmailVerify/>}/>
        <Route path="/user" element={isLoggedIn?<User/> : <Navigate to="/"/>}/>
        {/* <Route path="/user" element={<User/>}/> */}
        <Route path="/adminlogin" element={<AdminLogin/>}/>
         <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/initiatives" element={<Initiatives/>}/>
        <Route path="/profile" element={isLoggedIn ? <Profile/> : <Navigate to="/"/>}/>
        {/* <Route path="/profile" element={ <Profile/>}/> */}
        <Route path="/donationHistory" element={isLoggedIn ? <DonationHistory/> : <Navigate to="/"/>}/>
        <Route path="/donorlist" element={isAdminLogged ?<DonorList/> : <Navigate to="/"/>}/>
        <Route path="/donationdata" element={isAdminLogged ?<AdminDonationData/> : <Navigate to="/"/>}/>
      </Routes>
    </div>
  )
}

export default App
