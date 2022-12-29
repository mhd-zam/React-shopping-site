import React, { useState, useEffect } from "react";
import "../home/content.css";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/store";

function Content() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const dispatch=useDispatch()

  useEffect(() => {
    try {
      axiosPrivate
        .get("/home")
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(err);
          // dispatch(logout())
          // navigate("/login");
        });
    } catch (err) {
      console.log(err);
      // dispatch(logout())
      // navigate("/login");
    }
    return () => {
      console.log("cleanup");
    };
  }, []);

  function check() {
    axiosPrivate.get("/home").then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      {post.map((product, index) => {
        return (
          <div key={index} className="content">
            <div className="post">
              <img className="item" src={product.img} alt="" srcset="" />
              <div id="description">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Content;
