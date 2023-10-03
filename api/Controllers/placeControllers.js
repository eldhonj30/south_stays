import placeModel from "../Models/placeModel.js";
import imageDownloader from "image-downloader";
import asyncHandler from "express-async-handler";
import BookingModel from "../Models/bookingModel.js";

const imageLinkUpload = asyncHandler(async (req, res) => {
  const { link } = req.body;

  const newName = "photos_" + Date.now() + ".jpg";

  try {
    const data = await imageDownloader.image({
      url: link,
      dest: "../../Uploads/" + newName,
    });

    if (data) {
    return res.json(newName);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

const imageUpload = asyncHandler(async (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];

    uploadFiles.push(filename);
  }
  return res.json(uploadFiles);
});

const addPlace = asyncHandler(async (req, res) => {
  const { _id } = req.hostD;

  const {
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
    location,
  } = req.body;

  const placeDoc = await placeModel.create({
    owner: _id,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    location: {
      type: "Point",
      coordinates: [Number(location.lat), Number(location.lng)],
    },
  });

  return res.status(200).json(placeDoc);
});

const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // const place = await placeModel.findById(id).populate('owner')
    const place = await placeModel.findById(id).populate({
      path: "owner",
      select: "name _id",
    });

    return res.status(201).json(place);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const editPlace = asyncHandler(async (req, res) => {
  const {
    id,
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
    location,
  } = req.body;

  const placeDoc = await placeModel.findById(id);

  placeDoc.set({
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    location: {
      type: "Point",
      coordinates: [Number(location.lat), Number(location.lng)],
    },
  });
  placeDoc.save();

  return res.status(200).json("ok");
});

const userPlaces = asyncHandler(async (req, res) => {
  const { _id } = req.hostD;
  const places = await placeModel.find({ owner: _id });
  return res.status(200).json(places);
});

const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await placeModel.find();
  return res.status(200).json(places);
});

const searchByLoc = asyncHandler(async (req, res) => {
  const { lat, long } = req.query;
  const radius = 5000;
  try {
    const hotel = await placeModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lat), Number(long)],
          },
          $maxDistance: radius,
        },
      },
    });
    return res.status(201).json(hotel);
  } catch (error) {
    console.log(error);
  }
});

const searchByDate = asyncHandler(async (req, res) => {
  const { In, Out } = req.query;
  let checkIn = In
  let checkOut = Out
  try {
    const bookedPlaces = await BookingModel.find({
      $or: [
      {
        $and: [
          { status: "booked" },
          { checkIn: { $gte: checkIn } },
          { checkOut: { $lte: checkIn } },
        ],
      },
      {
        $and: [
          { status: "booked" },
          { checkIn: { $lt: checkOut } },
          { checkOut: { $gte: checkOut } },
        ],
      },
    ],
    });
    if (bookedPlaces) {
      const bookedIds = bookedPlaces.map((booking) => booking.place);

      const availableplaces = await placeModel.find({
        _id: { $nin: bookedIds },
      });
       return res.status(201).json(availableplaces);
    } else {
      const availableplaces = await placeModel.find({});
      return res.status(201).json(availableplaces);
    }
   
  } catch (error) {
    console.log(error);
  }
});

const searchByGuest = asyncHandler( async(req,res) => {
  const {guest} = req.query
 try {
   const places = await placeModel.find({ maxGuests: { $gte: guest } });
   return res.status(201).json(places)
 } catch (error) {
  console.error(error);
 }

})

export {
  imageLinkUpload,
  imageUpload,
  addPlace,
  userPlaces,
  getAllPlaces,
  getPlace,
  editPlace,
  searchByLoc,
  searchByDate,
  searchByGuest
};
