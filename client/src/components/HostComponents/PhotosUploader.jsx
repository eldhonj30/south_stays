import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const addPhotoLink = async (ev) => {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post("/host/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    } catch (error) {
      toast.error("Invalid image link", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };
  const uploadPhoto = async (ev) => {
    ev.preventDefault();
    const files = ev.target.files;
    const form = new FormData();

    for (let i = 0; i < files.length; i++) {
      form.append("photos", files[i]);
    }
    try {
      const { data: filenames } = await axios.post(
        "/host/upload-photos",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onChange((prev) => {
        return [...prev, ...filenames];
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    }
  };
  const removePhoto = (ev, filename) => {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (ev, filename) => {
    ev.preventDefault();
    const addedPhotoWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotoWithoutSelected];
    onChange(newAddedPhotos);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={"Add using a link ... jpg"}
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          className="bg-black-500 px-4 rounded-2xl"
          onClick={addPhotoLink}
        >
          Add&nbsp;Photo
        </button>
      </div>

      <div className="mt-2  grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grow">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div
              className="relative h-32 flex"
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="rounded-2xl w-full object-cover"
                src={backendUrl + "/uploads/" + link}
                alt="image"
              />
              <button
                onClick={(ev) => selectAsMainPhoto(ev, link)}
                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl  p-2 "
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
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
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
              {hoveredIndex === index && (
                <button
                  className="absolute top-1 right-1 p-2 bg-black bg-opacity-70 text-white rounded-2xl"
                  onClick={(ev) => removePhoto(ev, link)}
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        <label className="flex items-center justify-center p-2 gap-1 border bg-transparent rounded-2xl text-xl text-gray-600">
          <input
            onChange={uploadPhoto}
            type="file"
            className="hidden"
            multiple
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader;
