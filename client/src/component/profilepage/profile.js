import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import "../profilepage/profile.css";
import Axios from "../../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/store";

export default function Basic() {
  const id = useSelector((state) => state.user.value.id);
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);
  const phone = useSelector((state) => state.user.value.phone);
  let url=localStorage.getItem(`${id}`)
  const axiosprivate = useAxiosPrivate();
  let formdata = new FormData();
  const [img, setImage] = useState();

  useEffect(() => {
    setImage(url);
  }, []);

  function handleImage(e) {
    console.log(e.target.files[0].name);
    formdata.append("id", id);
    formdata.append("image", e.target.files[0]);
    try {
      
      axiosprivate
        .post("/users", formdata, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          localStorage.setItem(`${id}`,response.data)
          setImage(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="parentdiv">
      <div className="profilecard">
        <img className="profileimg" src={img ? img : null} alt="" srcset="" />
        <form>
          <input type="file" onChange={handleImage} name="image" id="" />
        </form>
        <h3>{username}</h3>
        <h5>{email}</h5>
        <h5>{phone}</h5>
      </div>
    </div>
  );
}
