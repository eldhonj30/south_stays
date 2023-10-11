import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner";

const HostPrivate = () => {
  const { host, hReady } = useContext(UserContext);

  if (!hReady) {
    return <LoadingSpinner />; 
  }

  return host ? <Outlet /> : <Navigate to="/host/login" replace />;
};
export default HostPrivate;
