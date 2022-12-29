import React, {  useState } from "react";
import useVerfyLogin from "../../Hooks/verifylogin";
import "../login/index.css";
import Axios from "../../axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    email,
    password,
    emailerr,
    passworderr,
    validate,
    emailSet,
    setPassword,
  } = useVerfyLogin();
  const [serverErr, setServerErr] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (emailerr == null && passworderr == null) {
      if (email && password) {
        try {
          let authenticate = await Axios.post(
            "/login",
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          console.log(authenticate.data);
          dispatch(login(authenticate.data));
          setPassword("");
          emailSet("");
          navigate('/')
          
        } catch (err) {
          if (!err?.response) {
            setServerErr("No server response");
          } else if (err.response?.status === 400) {
            setServerErr("missing username or password");
          } else if (err.response?.status === 401) {
            setServerErr("user not valid");
          }
        }
      }
    } else {
      validate("email", email);
      validate("password", password);
    }
  };

  return (
    <div className="parentdiv">
      <div className="logincontainer">
        <h2 className="heading">Login</h2>
        {serverErr && <h4>{serverErr}</h4>}
        <form onSubmit={handlesubmit} className="form">
          <label htmlFor="Email">Email</label>
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => {
              validate(e.target.name, e.target.value);
            }}
            name="email"
            id="Email"
          />
          <p>{emailerr}</p>
          <br />
          <label htmlFor="password">Password</label>
          <input
          className="input"
            type="text"
            value={password}
            onChange={(e) => {
              validate(e.target.name, e.target.value);
            }}
            name="password"
            id="password"
          />
          <p>{passworderr}</p>
          <button type="submit" className="loginbtn">
            Login
          </button>
        </form>
        <Link className='signup' to="/signup">signup</Link>
      </div>
    </div>
  );
}

export default Login;
