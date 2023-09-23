import axios from 'axios';
import React, { useState } from 'react'

function MesssageInput({userId,hostId,updateMsg}) { 

  const [newMsg,setNewMsg] = useState('')

  const sendMsg = async () => {
      let latestMsg = {
        mySelf:true,
        message:newMsg
      }
     await axios.post("/message/guest", { from: userId, to: hostId, message: newMsg });
     updateMsg(latestMsg);
     setNewMsg('')
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
        <button onClick={sendMsg} className="flex gap-2 h-10 m-1 text-xl items-center p-3 border border-black rounded-lg bg-primary ">
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

export default MesssageInput