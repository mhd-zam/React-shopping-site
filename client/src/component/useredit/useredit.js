import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../useredit/useredit.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../../axios/axios";

function Usereditpage() {
  const { state } = useLocation();
  const { id } = state;
  const [user, setUser] = useState({});
  const [inital, setInital] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    Axios.get("/userdetail", { params: { id } }).then((response) => {
      setUser(response.data);
      setInital(response.data);
    })
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();
    try {
    
      Axios.post("/updateuser", { user }).then(() => {
        navigate('/adminhome')
       
      }).catch((err) => {
        console.log(err);
        
      })
     
    } catch (err) {
      console.log(err)
    }
  }

  function setvalue(key, value) {
    let data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    data[key] = value;

    console.log(data);

    setUser(data);
  }

  function settointial() {
    setUser(inital);
  }

  return (
    <div className={style.contain}>
      <h2 className={style.maintitle}>Edit User</h2>
      <Form onSubmit={handlesubmit} className={style.Form}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className={style.formtitle}>username</Form.Label>
          <Form.Control
            value={user ? user.username : ""}
            onChange={(e) => setvalue(e.target.name, e.target.value)}
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={style.formtitle}>Email address</Form.Label>
          <Form.Control
            value={user ? user.email : ""}
            onChange={(e) => setvalue(e.target.name, e.target.value)}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicphone">
          <Form.Label className={style.formtitle}>phonenumber</Form.Label>
          <Form.Control
            value={user ? user.phone : ""}
            onChange={(e) => setvalue(e.target.name, e.target.value)}
            type="number"
            name="phone"
            placeholder="Enter phonenumber"
          />
        </Form.Group>
        <div className={style.btn}>
          <Button className={style.btnform} variant="primary" type="submit">
            update
          </Button>
          <Button
            className={style.btnform}
            onClick={settointial}
            variant="primary"
            type="button"
          >
            cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Usereditpage;
