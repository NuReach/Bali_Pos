import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ()=>{
    const user = localStorage.getItem("user");
    return user ? <Outlet /> :  <Navigate to={"/login"} />
}