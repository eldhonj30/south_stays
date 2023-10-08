import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function PlaceListingPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/host/user-places")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <div className="mt-24 p-3">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/host/editplace/" + place._id}
            className="flex bg-gray-200 gap-4 p-4 mt-2 rounded-2xl"
          >
            <div className="w-32 h-32 bg-gray-300 grow shrink-0">
              {place.photos.length > 0 && (
                <img
                  className="w-32 h-32 rounded-md"
                  src={backendUrl + "/Uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase"> {place.title} </h2>
              <h4 className="text-md mt-1 underline">{place.address}</h4>
              <p className="mt-1">{place.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default PlaceListingPage;
