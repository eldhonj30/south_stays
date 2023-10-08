import React, { useEffect, useRef } from "react";
import moment from "moment";

function Message({ msg }) {
  const scrollRef = useRef(null);
  let currentTime = moment();

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [msg]);

  const filteredMsgs = msg.map((message) => {
    let crtdMoment = moment(message.createdAt);
    let diff = currentTime.diff(crtdMoment);
    let durationInmnts = moment.duration(diff).minutes();
    let durationInhrs = moment.duration(diff).hours();
    let durationIndays = moment.duration(diff).days();
    message.time = durationInmnts
      ? durationInmnts + " minutes ago"
      : "Just now";
    if (durationInhrs > 1) message.time = durationIndays + " Hrs ago";
    if (durationIndays > 1) message.time = durationIndays + " days ago";
    return message;
  });

  return (
    <div className="h-[350px] overflow-auto overscroll-none">
      {filteredMsgs.map((item, index) => (
        <div key={index}>
          {item.mySelf === true ? (
            <div className="font-serif text-start bg-gray-300 lg:w-[30rem] w-[20rem] p-5 m-2 break-before-column sm:break-all rounded-2xl">
              <div className="flex">
                <p>{item?.message}</p>
                <p className="flex ml-auto mt-1 text-blue-600 text-sm font-sans">
                  {item?.time}
                </p>
              </div>
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
              <div className="flex">
                <p>{item?.message}</p>
                <p className="flex ml-auto text-blue-600 text-sm font-sans">
                  {item?.time}
                </p>
              </div>
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
      <div ref={scrollRef} />
    </div>
  );
}

export default Message;
