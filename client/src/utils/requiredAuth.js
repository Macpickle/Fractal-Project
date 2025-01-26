import { Navigate, Outlet } from "react-router-dom";

// redirects user based on authentication and role
const RequiredAuth = ({type}) => {    
    var user = localStorage.getItem('username');
    var role = localStorage.getItem('role');

    if (type === "admin") {
        return user && role === "admin" ? <Outlet/> : <Navigate to = '/'/>
    }

    if (type === "login") {
        return user ? <Outlet/> : <Navigate to = '/login'/>
    } 
    
    return !user ? <Outlet/> : <Navigate to = '/'/>
}

export default RequiredAuth;