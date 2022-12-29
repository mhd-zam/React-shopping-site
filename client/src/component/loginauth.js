
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Checklogin() {
    let user = useSelector((state)=>state.user.value.username)
    console.log(user);
    return (
        user?<Navigate to='/'/>:<Outlet/>
    )
}

export default Checklogin