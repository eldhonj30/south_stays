import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import HostMesssageInput from "../../components/HostComponents/HostMesssageInput";
import HostMessageSidebar from "../../components/HostComponents/HostMessageSidebar";
import HostMessage from "../../components/HostComponents/HostMessage";
import { UserContext } from "../../Contexts/UserContext";

function HostMessagePage() {
  const [history, sethistory] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [msg, setMsg] = useState([]);
  const [uId, setUId] = useState(null);
  const toRef = useRef(null);
  const { host, socket } = useContext(UserContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let userId = searchParams.get("id");
  if (userId) toRef.current = userId;
  const userName = searchParams.get("name");
  const hostId = host._id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`/message/host/get-room/${userId}/${hostId}/${hostId}`)
        .then(({ data }) => {
          setReceiver(userName);
          setMsg(data.allMessage);
        });
    }
    axios.get(`/message/host/history/${hostId}`).then((response) => {
      if (response.status === 201) {
        sethistory([...response.data]);
      }
    });
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.on("newMessage", (message, from) => {
      if (toRef.current == from) {
        message.mySelf = false;
        setMsg((prevMessages) => [...prevMessages, message]);
      }
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

  useEffect(() => {
    if (socket === null) return;
    socket.on("updateList", (from, id) => {
      axios.get(`/message/host/history/${hostId}`).then((response) => {
      if (response.status === 201){
        if (toRef.current != from) response.data[0].unread = true;
        sethistory([...response.data]);
      } 
      })
    });
  }, [socket]);

  const changeRoom = (roomId, todata) => {
    socket.emit("updateUnread", host);
    history[0].unread = false
    axios
      .get(`/message/host/change-room/${roomId}/${hostId}`)
      .then(({ data }) => {
        setReceiver(todata.name);
        setUId(todata._id);
        toRef.current = todata._id;
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
        {receiver && (
          <HostMesssageInput userId={userId} updateMsg={updateMsg} uId={uId} />
        )}
      </div>
    </div>
  );
}

export default HostMessagePage;
