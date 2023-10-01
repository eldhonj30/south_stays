import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import MesssageInput from "../../components/MesssageInput";
import MessageSidebar from "../../components/MessageSidebar";
import Message from "../../components/Message";
import { UserContext } from "../../Contexts/UserContext";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function MessagePage() {
  const [history, sethistory] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const [hId,setHId] = useState(null)
  const [msg, setMsg] = useState([]);
  const { user } = useContext(UserContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hostId = searchParams.get("id");
  const hostName = searchParams.get("name");
  const userId = user._id;

  useEffect(() => {
    if (hostId) {
      axios
        .get(`/message/chat/get-room/${userId}/${hostId}/${userId}`)
        .then(({ data }) => {
          setReceiver(hostName);
          setMsg(data.allMessage);
        });
    }
    axios.get(`/message/history/${userId}`).then((response) => {
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
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", userId);
    socket.on("getOnlineUsers", (res) => {
      console.log(res);
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
      from: userId,
      to: hostId || hId,
      message: data,
      chatId: response.chatid,
    });
  };

  const changeRoom = (roomId, todata) => {
    axios
      .get(`/message/chat/change-room/${roomId}/${userId}`)
      .then(({ data }) => {
        setHId(todata._id)
        setReceiver(todata.name);
        setMsg(data.allMessage);
      });
  };

  return (
    <div className="flex-1 grid grid-cols-[1fr_2fr] md:grid-cols[1fr_1fr]">
      <MessageSidebar history={history} changeRoom={changeRoom} />

      <div className="flex flex-col ">
        <div className="pl-3 p-2 h-16 bg-gray-400 rounded-md">
          <h4 className="text-xl font-bold text-primary">{receiver}</h4>
        </div>

        <Message msg={msg} />
        {receiver && (
          <MesssageInput hostId={hostId} updateMsg={updateMsg} hId={hId} />
        )}
      </div>
    </div>
  );
}

export default MessagePage;
