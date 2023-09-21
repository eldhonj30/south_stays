import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "../../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const containerStyle = {
    width: "400px",
    height: "300px",
    borderRadius: "8px",
    position: "relative",
  };
  const getEditForm = async () => {
    const { data } = await axios.post("/guest/edit-form", {
      email: user.email,
      password,
    });
    if (data?.name) {
      setUserData(data);
      setPassword("");
      setName(data.name);
      closeModal();
      showModal();
    }
  };

  const handleEdit = async () => {
    if (password) {
      if (password.trim().length < 6) {
        toast.error("your password must be 6 characters long");
      }
      if (password.trim() !== conPassword.trim()) {
        toast.error("password and confirm password should match");
      }
    }

    const { data } = await axios.post("/guest/edit-profile", {
      name,
      password,
      id: user._id,
    });
    closeModal();
    setUserData("");
    setPassword("");
    setName("");
    setConPassword("");
    setUser(data);
    navigate("/profile");
  };
  const showModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setPassword("");
  };
  const bg = {
    modal: {
      background: "rgba(255, 255, 255, 0.001)",
      padding: "3rem",
    },
  };

  return (
    <div className="flex justify-center mt-20 ">
      <div
        style={containerStyle}
        className="flex flex-row border border-black p-4 rounded-md pt-10 bg-gray-200"
      >
        <div className="basis-1/4">
          {user?.image ? (
            <img
              className="w-24 h-24 border border-black rounded-full mr-4"
              src={user.profileImageUrl}
              alt="Profile"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-24 h-32 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="mt-8 ml-2">
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">{user.name}</h2>
          </div>
          <div className="flex gap-4">
            <h3 className="text-lg">Email :</h3>
            <h2 className="text-lg text-gray-600">{user.email}</h2>
          </div>
          <div>
            <button
              onClick={showModal}
              className="absolute inline-flex ml-10 bottom-5 py-2 px-8 text-white rounded-full  bg-blue-400 hover:text-black"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        onClose={closeModal}
        showCloseIcon={false}
        center={true}
        styles={bg}
      >
        {userData?.name ? (
          <div>
            <h2 className="text-center text-2xl font-bold">Edit Form</h2>
            <input
              type="text"
              placeholder={"Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="password"
                placeholder={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder={"confirm password"}
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleEdit}
              className=" p-2 mt-2 w-full rounded-full"
            >
              <span className="text-xl font-bold">Submit</span>
            </button>
          </div>
        ) : (
          <div>
            <input
              type="password"
              placeholder={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center mt-2">
              <button onClick={getEditForm} className="p-3 w-full rounded-full">
                <span className="text-xl font-bold">Verify</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProfileComponent;
