import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  let data = location.state;
  useEffect(() => {
    if (data?.length) {
      setPlaces(data);
    } else {
      axios.get("/admin/all-places").then((response) => {
        setPlaces(response.data);
      });
    }
  }, []);

  if (!places?.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-8 px-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <div key={index}>
            <Link to={"/placedetails/" + place._id}>
              <div className="bg-gray-500 rounded-2xl flex ">
                {place?.photos.length && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={backendUrl + "/Uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold text-md truncate">{place.address}</h2>
              <h2 className="text-sm truncate ">{place.title}</h2>
              <div className="mt-1">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default IndexPage;
