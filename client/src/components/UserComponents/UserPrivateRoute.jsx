import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner";

const UserPrivateRoute = () => {

   const { user, ready } = useContext(UserContext); 

     if (!ready) {
       return <LoadingSpinner />;
     }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default UserPrivateRoute;
