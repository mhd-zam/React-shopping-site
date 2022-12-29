import Login from "./component/login/login";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Signup from "./component/signup/signup";
import Home from "./component/home/home";

import Profile from "./component/profilepage/profile";
import Nav from "./component/home/nav";
import UserAuth from "./component/userAuth";
import { useState,useEffect } from "react";
import Checklogin from "./component/loginauth";
import AdminLogin from "./component/adminlogin/adminlogin";
import Adminhomepage from "./pages/adminhome";
import Usereditpage from "./component/useredit/useredit";
import Adduser from "./component/adduser/Adduser";
import Adminauth from "./component/adminauth";



function App() {
  return (
   
      <Router>  
        <Routes>
          <Route element={<Checklogin/>} >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<UserAuth />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/adminlogin" element={<AdminLogin/>} />
      <Route element={<Adminauth/>} >
        <Route path="/adminhome" element={<Adminhomepage />} />
        <Route path="/usereditpage" element={<Usereditpage />} />
        <Route path="/adduser" element={<Adduser />} />
      </Route>
        </Routes>
      </Router>
  );
}

export default App;
