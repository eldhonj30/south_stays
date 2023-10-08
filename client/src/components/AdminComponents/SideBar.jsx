import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  let path = location.pathname.split("/")[2];

  return (
    <div
      className="mt-16  w-56 text-black border flex flex-col"
      style={{ height: "555px", backgroundColor: "#ffecec" }}
    >
      <NavLink
        to={"/admin"}
        className={path === undefined ? "text-blue-500 p-4 mt-5" : "p-4 mt-5"}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={"/admin/user"}
        className={path === "user" ? "text-blue-500 p-4" : "p-4"}
      >
        User
      </NavLink>
      <NavLink
        to={"/admin/host"}
        className={path === "host" ? "text-blue-500 p-4" : "p-4"}
      >
        Host
      </NavLink>
    </div>
  );
}

export default SideBar;
