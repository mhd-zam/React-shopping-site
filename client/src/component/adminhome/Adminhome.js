import Table from "react-bootstrap/Table";
import style from "../adminhome/adminhome.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState,useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import Axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminlogout } from "../../redux/store";






function Adminhome() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const dispatch=useDispatch()


   function fetchdata() {
     Axios.get('/adminuser').then((response) => {
       setUser(response.data)
     })
   }

  useEffect(() => {
    try {
    fetchdata()
    } catch (err) {
      console.log(err);
      
    }
   
  },[])

  function editbutton(id) {
    navigate('/usereditpage',{state:{id}})
  }
  
  function deleteitem(id) {
    Axios.delete('/deleteuser', { data: { id } }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then(() => {
     let result= parseInt(user.findIndex(value=>value._id==id))
     fetchdata()
    })
  }


  function adduser() {
    navigate('/adduser');
  }


  function logout() {
    dispatch(adminlogout())
  }


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">welcome Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link  onClick={logout} >
                Logout
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Button className={style.btnadd} onClick={adduser}  variant="primary">ADD USER</Button>
      <div className={style.cover}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.filter((value) => {
              if (search == "") {
                return value;
              } else if (
                value.username.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            }).map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.phone}</td>
                      <td>{data.email}</td>
                      <td ><span onClick={()=>editbutton(data._id)} className={style.edit} ><RiEditBoxLine/></span></td>
                      <td><span className={style.delete} onClick={()=> deleteitem(data._id)} ><AiFillDelete/></span></td>
                     
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Adminhome;
