import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext';

function HostMesssageInput({userId,updateMsg,uId}) { 

  const [newMsg,setNewMsg] = useState('');
  const { host } = useContext(UserContext);

  const sendMsg = async () => {
      let latestMsg = {
        mySelf:true,
        message:newMsg
      }
     const {data} = await axios.post("/message/guest", {
       hostId: host._id,
       userId:userId || uId,
       senderId: host._id,
       message: newMsg,
     });
    setNewMsg("");
     updateMsg(latestMsg,data);
  }

  return (
    <div className="flex gap-1 mt-auto p-5">
      <input
        type="text"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Your message"
      />
      <input type="file" />
      <div>
        <button onClick={sendMsg} className="flex gap-2 h-10 
        m-1 text-xl items-center p-3 border border-black rounded-lg bg-primary ">
          Send
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
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HostMesssageInput