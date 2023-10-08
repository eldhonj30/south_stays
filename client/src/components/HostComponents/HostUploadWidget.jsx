import { useEffect, useRef, useState } from "react";

export const HostUploadWidget = ({ getFileUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [demo, setDemo] = useState("");

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dyyqku2vc",
        uploadPreset: "miyxu5ot",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          getFileUrl(
            result.info.url,
            result.info.thumbnail_url,
            result.info.resource_type
          );
        }
      }
    );
  }, [setDemo]);

  return (
    <div>
      <button
        className="flex gap-2 px-4 py-2 bg-blue-400   rounded-xl text-lg"
        onClick={() => widgetRef.current.open()}
      >
        Share
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
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
      </button>
    </div>
  );
};
