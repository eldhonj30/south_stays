import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import SearchComponent from "./SearchComponent";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  let location = useLocation();
  let host = location.pathname;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    axios.post("/guest/logout").then(() => {
      setIsDropdownOpen(!isDropdownOpen);
      setUser(null);
      navigate("/");
    });
  };

  return (
    <div>
      <header className="flex justify-between sm:px-6 lg:px-8 py-5 bg-gradient-to-r from-gray-400  to-gary-500">
        <Link to={"/"} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="font-bold">South Stays</span>
        </Link>
        <SearchComponent />

        <div className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-4 ">
          {host == "/" && (
            <>
              <div className="animate-pulse text-primary">
                <Link to={"/host"}>Want to host ?</Link>
              </div>
              <div className="border-l h-7  border-gray-300"></div>{" "}
            </>
          )}
          <div className="realtive">
            <button
              onClick={toggleDropdown}
              className="text-gray-black bg-transparent mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-20 right-1 w-40 bg-white shadow-md rounded-md p-2">
                <ul>
                  <li className="py-1 px-2 hover:bg-gray-100">
                    {!user?.name ? (
                      <Link to="/register" onClick={toggleDropdown}>
                        Sign Up
                      </Link>
                    ) : (
                      <Link to="/profile" onClick={toggleDropdown}>
                        Profile
                      </Link>
                    )}
                  </li>
                  <li className="py-1 px-2 hover:bg-gray-100">
                    {user?.name ? (
                      <button className="bg-white" onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <Link to="/login" onClick={toggleDropdown}>
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1.5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && <div>{user.name}</div>}
        </div>
      </header>
    </div>
  );
}

export default Header;
