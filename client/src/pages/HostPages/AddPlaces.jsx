import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Perks from "../../components/HostComponents/Perks";
import PhotosUploader from "../../components/HostComponents/PhotosUploader";
import GMap from "../../components/GMap"
import { toast } from "react-toastify";
import AddressSearch from "../../components/HostComponents/AddressSearch";
import Modal from "react-responsive-modal";

function AddPlaces() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [map,setMap] = useState(false)
  const [location,setLocation] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/host/edit-place/" + id)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price)
        setLocation(data.location)
      })
      .catch((err) => {
        
        toast.error("Please fill out all the fields")
      });
  }, [id]);

  const openMap = (evnt) => {
    evnt.preventDefault()
    setMap(true)
  }

  const closeMap = () => {
    setMap(false)
  }

  const getAddress = (data) => {
    setAddress(data)
  }
  
  const getLocation = (data) => {
    if(!data) return
    setLocation(data);
  }

  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      location
    };

    if (id) {
      try {
        await axios.put("/host/edit-place", { id, ...placeData });
        navigate("/host/listings");
      } catch (error) {
        toast.error("please fill out the fields");
      }
    } else {
      try {
        await axios.post("/host/add-place", placeData);
        navigate("/host/listings");
      } catch (error) {
        toast.error("please fill out the fields");
      }
    }
  };

  return (
    <div className="mt-20 mx-2">
      <div className="max-w-2xl min-w-xl mx-auto">
        <form onSubmit={savePlace}>
          <h2 className="text-2xl mt-2">Tittle</h2>
          <p className="text-gray-500 text-sm">
            Tittle for your place.Should be short and catchy
          </p>
          <input
            type="text"
            placeholder="tittle, for example: My lovely apartment"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <h2 className="text-2xl mt-2">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <div className="flex gap-2">
            <AddressSearch getAddress={getAddress} />
            <button onClick={openMap} className="bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl mt-2">Photos</h2>
          <p className="text-gray-500 text-sm">More = better</p>

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          <h2 className="text-2xl mt-2">Description</h2>
          <p className="text-gray-500 text-sm">Descriptions for your place</p>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <h2 className="text-2xl mt-2">Perks</h2>
          <p className="text-gray-500 text-sm">
            Select all the perks on your place
          </p>
          <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <div>
            <h2 className="text-2xl mt-2">Extra Info</h2>
            <p className="text-gray-500 text-sm">Address to this place</p>
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            <h2 className="text-2xl mt-2">Check In&Out times</h2>
            <p className="text-gray-500 text-sm">
              Add check in and Out time. Remember to give some time window for
              cleaning
            </p>
          </div>
          <div className="gap-2 grid sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2">Check in time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2">Check out time</h3>
              <input
                type="text"
                placeholder="10"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2">Max number of guest</h3>
              <input
                type="number"
                placeholder="2 per room"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2">Price per room</h3>
              <input
                type="number"
                placeholder="2 per room"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center m-10">
            <button type="submit" className="primary min-w-sm max-w-md">
              Save
            </button>
          </div>
        </form>
      </div>
      <Modal open={map} onClose={closeMap} center>
        <GMap getLocation={getLocation} />
      </Modal>
    </div>
  );
}

export default AddPlaces;
