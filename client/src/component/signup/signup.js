import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/hooks";
import style from "../signup/signup.module.css";

function Signup() {
  const {
    email,
    password,
    username,
    phone,
    usererr,
    emailerr,
    passworderr,
    phoneerr,
    Getform,
    validate,
  } = useForm();

  const userRef = useRef()
  
  useEffect(() => {
    userRef.current.focus()
  },[])

  return (
    <div className={style.parentdiv}>
      <div className={style.container}>
        <h2 className="heading">Signup</h2>
        <form onSubmit={Getform} >
          <label className={style.label} htmlFor="Name">Name</label>
          <input
            type="text"
            className={style.input}
            value={username}
            onChange={(e) => validate(e.target.name, e.target.value)}
            name="username"
            id=""
            ref={userRef}
          />
          <p className={style.ptag} >{usererr}</p>
          <label className={style.label} htmlFor="Email">Email</label>
          <input  className={style.input} value={email} type="text" onChange={(e)=>validate(e.target.name,e.target.value)} name="email" id="" />
          <p className={style.ptag} >{emailerr}</p>
          <label className={style.label} htmlFor="Phone">Phonenumber</label>
          <input  className={style.input}  value={phone} type="number" onChange={(e)=>{validate(e.target.name,e.target.value)}}  name="phone" id="" />
          <p className={style.ptag} >{phoneerr}</p>
          <label className={style.label} htmlFor="Password">Password</label>
          <input  className={style.input}  value={password} type="text" onChange={(e) => { validate(e.target.name, e.target.value) }} name="password" id="" />
          <p className={style.ptag} >{passworderr}</p>
          <input type="submit" className={style.signupbtn} value='Signup' />
        </form>
        <Link className={style.loginlink} to="/login">login</Link>
      </div>
    </div>
  );
}

export default Signup;
