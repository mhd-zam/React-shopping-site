import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from '../axios/axios'

const useForm = () => {
  const history = useNavigate();

  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [usererr, setusererror] = useState("");
  const [emailerr, setemailerror] = useState("");
  const [passworderr, setpassworderror] = useState("");
  const [phoneerr, setphoneerror] = useState("");

  function validate(key, value) {
    switch (key) {
      case "username":
        if (!new RegExp(/[A-Za-z]/).test(value)) {
          setusererror("username not valid");
        } else {
          setusererror(null);
        }
        setusername(value);
        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setemailerror("email not valid");
        } else {
          setemailerror(null);
        }
        setemail(value);
        break;
      case "phone":
        if (value.length !== 10) {
          setphoneerror("phonenumber not valid");
        } else {
          setphoneerror(null);
        }
        setphone(value);
        break;
      case "password":
        if (!new RegExp(/^.{7,16}$/).test(value)) {
          setpassworderror("password should be atleast 7 character");
        } else {
          setpassworderror(null);
        }
        setpassword(value);
        break;
      default:
        break;
    }
  }

  function Getform(e) {
    e.preventDefault();
    if ( usererr == null && passworderr == null && phoneerr == null && emailerr == null) {
      if (password && phone && username && email) {
          Axios.post('/signup',{
            username,
            email,
            phone,
            password
        }).then(() => {
              history('/login');
        })
      } 
    }else {
        validate("username", username);
        validate("email", email);
        validate("phone", phone);
        validate("password", password);
      }
  }

  return {
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
  };
};
export default useForm;
