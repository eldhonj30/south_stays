import React from 'react'


function Message({msg}) {
  return (
    <div className="h-[350px] overflow-auto overscroll-none ">
      {msg.map((item, index) => (
        <div key={index}>
          {item.mySelf === true ? (
            <div className="font-serif text-start bg-gray-300 lg:w-[30rem] w-[20rem] p-5 m-2 break-before-column sm:break-all rounded-2xl">
              <p>{item?.message}</p>
            </div>
          ) : (
            <div className="font-serif text-start bg-green-900 lg:w-[30rem] w-[20rem] p-5 m-2 ml-auto break-after-column rounded-2xl">
              <p>{item?.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Message