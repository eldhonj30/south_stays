import React, { useEffect, useRef } from 'react'


function HostMessage({msg}) {

    const scrollRef = useRef(null);

    useEffect(() => {
      if (scrollRef.current) {
        console.log("Scrolling into view");
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [msg]);

  return (
    <div className="h-[350px] overflow-auto overscroll-none" ref={scrollRef}>
      {msg.map((item, index) => (
        <div key={index}>
          {item.mySelf === true ? (
            <div className="font-serif text-start bg-gray-300 lg:w-[30rem] w-[20rem] p-5 m-2 break-before-column sm:break-all rounded-2xl">
              <p>{item?.message}</p>
              {item?.filetype && (
                <div>
                  {item?.filetype === "image" ? (
                    <img className="w-[7rem]" src={item.fileUrl}></img>
                  ) : (
                    <a className="text-blue-400" href={item.fileUrl}>
                      Download
                    </a>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="font-serif text-start bg-green-300 lg:w-[30rem] w-[20rem] p-5 m-2 ml-auto break-after-column rounded-2xl">
              <p>{item?.message}</p>
              {item?.filetype && (
                <div>
                  {item?.filetype === "image" ? (
                    <img className="w-[7rem]" src={item.fileUrl}></img>
                  ) : (
                    <a className="text-blue-400" href={item.fileUrl}>
                      Download
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HostMessage 