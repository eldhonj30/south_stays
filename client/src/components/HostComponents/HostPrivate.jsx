import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner";

const HostPrivate = () => {
   const { host, ready } = useContext(UserContext);

   if (!ready) {
     return <LoadingSpinner />;
   }

  return host ? <Outlet /> : <Navigate to="/host/login" replace />;
};
export default HostPrivate;
