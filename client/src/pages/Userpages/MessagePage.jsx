import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import MesssageInput from '../../components/MesssageInput';
import MessageSidebar from '../../components/MessageSidebar'
import Message from '../../components/Message';
import { UserContext } from '../../Contexts/UserContext';


function MessagePage() {

  const [history,sethistory] = useState([])
  const [receiver,setReceiver] = useState({})
  const [msg,setMsg] = useState([])
  const{user} = useContext(UserContext)
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hostId = searchParams.get("id");
  const userId = user._id

    useEffect(() => {
      if (hostId) {
        axios.get(`/message/get/${userId}/${hostId} `).then(({ data }) => {
          setReceiver(data.receiver);
          setMsg(data.allMessage);
        });
      }
      axios.get(`message/history/${userId}`);
    }, []);

    const updateMsg = (data) => {
      setMsg([...msg,data])
    }

  return (
    <div className="flex-1 grid grid-cols-[1fr_2fr] md:grid-cols[1fr_1fr]">
      <MessageSidebar/>

      <div className="flex flex-col ">

        <div className="pl-3 p-2 h-16 bg-gray-400 rounded-md">
          <h4 className="text-xl font-bold text-primary">{receiver.name}</h4>
          <span>{receiver.email}</span>
        </div> 

        <Message msg={msg} />
        <MesssageInput userId={userId} hostId={hostId} updateMsg={updateMsg} />
      </div>
    </div>
  );
}

export default MessagePage