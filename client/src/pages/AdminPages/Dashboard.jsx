import React, { useEffect, useState } from 'react'
import SideBar from '../../components/AdminComponents/SideBar'
import axios from 'axios'
import ChartComponent from '../../components/AdminComponents/ChartComponent'

function Dashboard() {

  const [guest,setGuest] = useState(0)
  const [host,setHost] = useState(0)
  const [place,setPlace] = useState(0)

  let style = "font-bold text-xl text-green-600 ml-[8rem] "

  useEffect(()=>{
    axios.get('/admin/dashboard/counts').then(({data}) => {
      setGuest(data.guestCount)
      setHost(data.hostCount)
      setPlace(data.placeCount)
    })
  },[])
  return (
    <div className=" flex bg-gray-200 h-screen">
      <div>
        <SideBar />
      </div>

      <div className="mt-20 w-screen m-5">
        <div className="flex-1 container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="flex-row bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">No of Users</h2>
              <p className={style}>{guest}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">No of Hosts</h2>
              <p className={style}>{host}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">No of Places</h2>
              <p className={style}>{place}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 container mx-auto p-4">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard