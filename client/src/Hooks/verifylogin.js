import { useState } from "react";


function useVerfyLogin() {
  const [email, emailSet] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passworderr, setPassworderr] = useState("");

  function validate(name, value) {
    switch (name) {
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setEmailerr("Email not valid");
        } else {
          setEmailerr(null);
        }
        emailSet(value);
        break;
      case "password":
        if (!new RegExp(/^.{7,16}$/).test(value)) {
          setPassworderr("password not valid");
        } else {
          setPassworderr(null);
        }
        setPassword(value);
        break;
      default:
        break;
    }
  }

  

  return {
    email,
    password,
    emailerr,
    passworderr,
      validate,
      emailSet,
    setPassword
  };
}

export default useVerfyLogin;
