import React, { useEffect, useState } from "react";
import SideBar from "../../components/AdminComponents/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import BookingModal from "../../components/AdminComponents/BookingModal";

function HostPage() {
  const [hosts, setHosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/all-hosts")
      .then((response) => {
        setHosts([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Block and Unblock Host

  const blockunBlock = (id, block) => {
    let action;
    {
      block ? (action = "Unblocked") : (action = "blocked");
    }
    Swal.fire({
      title: "Are you sure?",
      text: `Your user will be ${action}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/admin/host-manage", { id, block }).then(({ data }) => {
          setHosts([...data]);
        });
        Swal.fire(`${action}`, `User is ${action}`, "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe.", "error");
      }
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // get user bookings
  const getBookings = async (id) => {
    const { data } = await axios.get(`/admin/host-bookings?id=${id}`);
    setBookings([...data]);
    openModal();
  };

  return (
    <div className="max-h-screen flex">
      <div>
        <SideBar />
      </div>
      <div className="overflow-x-md  mt-20 w-screen m-5">
        <h2 className="p-2 text-2xl font-bold">All Host Users</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Bookings</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((host, index) => (
              <tr key={host._id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">{host.name}</td>
                <td className="py-2 px-4 border-b text-center">{host.email}</td>
                <td className="text-center">
                  {" "}
                  <button
                    className="bg-blue-400 p-3 rounded-xl text-center"
                    onClick={() => getBookings(host._id)}
                  >
                    Bookings
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {host.blocked ? (
                    <button
                      className="bg-green-200 p-3 rounded-2xl"
                      onClick={() => blockunBlock(host._id, host.blocked)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="bg-red-400 p-3 rounded-xl"
                      onClick={() => blockunBlock(host._id, host.blocked)}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookingModal
        showModal={showModal}
        closeModal={closeModal}
        bookings={bookings}
      />
    </div>
  );
}

export default HostPage;
