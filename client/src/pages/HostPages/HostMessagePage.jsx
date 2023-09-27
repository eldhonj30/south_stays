import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import HostMesssageInput from "../../components/HostComponents/HostMesssageInput";
import HostMessageSidebar from "../../components/HostComponents/HostMessageSidebar";
import HostMessage from "../../components/HostComponents/HostMessage";
import { UserContext } from "../../Contexts/UserContext";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function HostMessagePage() {
  const [history, sethistory] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [msg, setMsg] = useState([]);
  const [online, setOnline] = useState([]);
  const [uId,setUId] = useState(null)
  const [socket, setSocket] = useState(null);
  const { host } = useContext(UserContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let userId = searchParams.get("id");
  const userName = searchParams.get("name");
  const hostId = host._id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`/message/chat/get-room/${userId}/${hostId}/${hostId}`)
        .then(({ data }) => {
          setReceiver(userName);
          setMsg(data.allMessage);
        });
    }
    axios.get(`/message/history/${hostId}`).then((response) => {
      if (response.status === 201) {
        sethistory([...response.data]);
      }
    });
  }, []);
  // socket connection initialization
  useEffect(() => {
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [host]);
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", hostId);
    socket.on("getOnlineUsers", (res) => {
      setOnline(res);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("newMessage", (data) => {
      data.mySelf = false;
      setMsg((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  const updateMsg = (data, response) => {
    setMsg([...msg, data]);
    socket.emit("sendMessage", {
      from: host._id,
      to: userId || uId,
      message: data,
      chatId: response.chatid,
    });
  };

  const changeRoom = (roomId, todata) => {
    axios
      .get(`/message/chat/change-room/${roomId}/${hostId}`)
      .then(({ data }) => {
        setReceiver(todata.name);
        setUId(todata._id)
        setMsg(data.allMessage);
      });
  };

  return (
    <div className="flex-1 mt-16 grid grid-cols-[1fr_2fr] md:grid-cols[1fr_1fr]">
      <HostMessageSidebar history={history} changeRoom={changeRoom} />

      <div className="flex flex-col ">
        <div className="pl-3 p-2 h-16 bg-gray-400 rounded-md">
          <h4 className="text-xl font-bold text-primary">{receiver}</h4>
        </div>

        <HostMessage msg={msg} />
        <HostMesssageInput userId={userId} updateMsg={updateMsg} uId={uId} />
      </div>
    </div>
  );
}


export default HostMessagePage;
