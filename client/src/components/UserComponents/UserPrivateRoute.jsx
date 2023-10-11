import { useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import LoadingSpinner from "../LoadingSpinner";

const UserPrivateRoute = () => {
  const { user, ready } = useContext(UserContext);
  const navigate = useNavigate()
  if (!ready) {
    return <LoadingSpinner/>
  }

  if(ready){
    return user ? <Outlet /> : navigate("/login");
  }

  
};
export default UserPrivateRoute;
