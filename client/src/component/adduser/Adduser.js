import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../adduser/Adduser.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../../axios/axios";

function Adduser() {
    const [userData, setUserData] = useState({});
    const navigate=useNavigate()
  
  let data = {
    username: null,
    email: null,
    phone: null,
    password: null,
  };
  
    function onsubmit(e) {
        e.preventDefault()
        Axios.post('/adduser', { data }).then(() => {
            console.log('reached');
        })
    }


    function redirect() {
        navigate('/adminhome')
    }

  return (
    <div className={style.contain}>
      <h2 className={style.maintitle}>Add User</h2>
      <Form onSubmit={onsubmit} className={style.Form}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className={style.formtitle}>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => {
              data.username=e.target.value
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={style.formtitle}>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => {
                data.email=e.target.value
              }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicphone">
          <Form.Label className={style.formtitle}>phonenumber</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter phonenumber"
            onChange={(e) => {
                data.phone=e.target.value
              }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicphone">
          <Form.Label className={style.formtitle}>Password</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter password"
            onChange={(e) => {
                data.password=e.target.value
              }}
          />
        </Form.Group>
        <div className={style.btn}>
          <Button className={style.btnform} variant="primary" type="submit">
            submit
          </Button>
              </div>
              <Button className={style.homeBtn} onClick={redirect}  variant="primary">
              Go To Home
            </Button>
      </Form>
    </div>
  );
}

export default Adduser;
