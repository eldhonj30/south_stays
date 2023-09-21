import React, { useContext } from 'react'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../Contexts/UserContext';


function AdminHeader() {
  const { setAdmin } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogOut = () => {
    axios.post("/admin/logout").then(() => {
      setAdmin(null)
      navigate("/admin/login");
    });
  }

  return (
    <header
      className="fixed w-full"
      style={{ backgroundColor: "#ffecec" }}
    >
      <div className="sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/admin"} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span className="text-black text-xl font-bold">Admin</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
      
                <button
                  className="flex justify-between items-center w-40 h-12 px-3  bg-primary text-white rounded-md"
                  id="user-menu"
                >
                  <span className="text-md font-bold">South Stays</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={handleLogOut}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
          
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader