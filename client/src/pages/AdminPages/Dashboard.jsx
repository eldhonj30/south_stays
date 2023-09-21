import React from 'react'
import SideBar from '../../components/AdminComponents/SideBar'

function Dashboard() {
  return (
    <div className="h-screen flex">
      <div>
        <SideBar />
      </div>

      <div className="bg-black mt-20 w-screen m-5"></div>
    </div>
  );
}

export default Dashboard