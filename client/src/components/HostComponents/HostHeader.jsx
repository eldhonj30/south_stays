import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios"

const HostHeader = () => {

  const { setHost,host } = useContext(UserContext);
  const navigate = useNavigate()


  const handleLogout = () => {
    axios.post("/host/logout").then(() => {
     localStorage.removeItem("host");
      setHost(null);
      navigate("/host");
    });
  };

  return (
    <header
      className="bg-white fixed w-full"
      style={{ backgroundColor: "#ffecec" }}
    >
      <div className="sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/"} className="flex items-center gap-1">
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
              <span className="text-primary font-extrabold">South Stays</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/host/listings"
              className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Listings
            </Link>
            <Link
              to="/host/bookings"
              className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Bookings
            </Link>
            <Link
              to="/host/message"
              className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Messages
            </Link>
            {host?.name && (
              <Link className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                <button
                  className="bg-transparent hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            )}
            <div className="ml-3 relative">
              <Link to={"/host/addplaces"}>
                <button
                  className="flex justify-between items-center w-28 h-12 px-3  bg-primary text-white rounded-md"
                  id="user-menu"
                >
                  Set Up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HostHeader;
