import React from 'react'

function MessageSidebar({history,changeRoom,socket}) {
  console.log(socket);
  return (
    <div className="bg-gray-300 ">
      <div className="flex p-2 gap-2">
        <input type="text" placeholder="Search" />
        <div className="flex items-center">
          <button className="bg-primary px-3 py-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        {history.length > 0 ? (
          <div>
            {history.map((chat, index) => (
              <div
                key={index}
                onClick={() => {
                  changeRoom(chat._id, chat.hostId);
                }}
                className="bg-white h-16  mx-8 my-2 px-4 py-2 rounded-2xl"
              >
                <h3 className="font-bold">{chat?.hostId?.name}</h3>
                <p>{chat.latestmessage}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No Chat History</div>
        )}
      </div>
    </div>
  );
}

export default MessageSidebar