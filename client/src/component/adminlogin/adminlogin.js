import React, { useContext, useState } from "react";
import "../adminlogin/admin.css";
import Axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../../redux/store";
import { useDispatch } from "react-redux";


function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const dispatch=useDispatch()
  
  function redirect(e) {
    e.preventDefault()
    const admin={
      email: email,
      password: password,
      accessToken:'hjjhj454454'
    }
    Axios.post('/adminlogin', { admin }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((response) => {
      dispatch(adminlogin(admin)) 
      navigate('/adminhome')
    }).catch(() => {
      setError('incorrect username or password')
    })
  }
 
  return (
    <div className="parentdiv">
      <div className="logincontainer">
        <h2 className="heading">Admin Login</h2>
        {error?<p>{error}</p>:null}
        <form  className="form">
          <label htmlFor="Email">Email</label>
          <input
            className="input"
            type="text"
            name="email"
            id="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <p></p>
          <br />
          <label htmlFor="password">Password</label>
          <input
          className="input"
            type="text"
            name="password"
            id="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <p></p>
          <button type="submit" onClick={redirect} className="loginbtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
