import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";

function Adminauth() {
  let admin = useSelector((state) => state.admin.value.email)
  console.log(admin);
  return (
   admin?<Outlet/>:<Navigate to='/adminlogin'/>
  )
}

export default Adminauth