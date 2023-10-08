import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner";

const AdminPrivateRoute = () => {
  const { admin, ready } = useContext(UserContext);

  if (!ready) {
    return <LoadingSpinner />;
  }

  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
export default AdminPrivateRoute;
