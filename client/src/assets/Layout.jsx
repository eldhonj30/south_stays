import React from "react";
import Header from "../components/UserComponents/Header";
import { Outlet, useLocation } from "react-router-dom";
import HostHeader from "../components/HostComponents/HostHeader";
import AdminHeader from "../components/AdminComponents/AdminHeader";

function Layout() {
  let location = useLocation();
  let host = location.pathname.split("/")[1];

  return (
    <div className="flex flex-col min-h-screen">
      {host === "host" ? <HostHeader /> :host === "admin" ? <AdminHeader/> : <Header />}
      <Outlet />
    </div>
  );
}

export default Layout;
