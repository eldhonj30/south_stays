import placeModel from "../Models/placeModel.js";
import imageDownloader from "image-downloader";
import asyncHandler from "express-async-handler";

const imageLinkUpload = asyncHandler(async (req, res) => {
  const { link } = req.body;

  const newName = "photos_" + Date.now() + ".jpg";

  try {
    const data = await imageDownloader.image({
      url: link,
      dest: "../../Uploads/" + newName,
    });

    if (data) {
      res.json(newName);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const imageUpload = asyncHandler(async (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];

    uploadFiles.push(filename);
  }
  res.json(uploadFiles);
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
  });

  res.status(200).json(placeDoc);
});

const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const place = await placeModel.findById(id).populate('owner')
    res.status(201).json(place);
  } catch (error) {
    console.log(error);
    res.status(500);
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
  });
  placeDoc.save();

  res.status(200).json("ok");
});

const userPlaces = asyncHandler(async (req, res) => {
  const { _id } = req.hostD;
  const places = await placeModel.find({ owner: _id });
  res.status(200).json(places);
});

const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await placeModel.find();
  res.status(200).json(places);
});

export {
  imageLinkUpload,
  imageUpload,
  addPlace,
  userPlaces,
  getAllPlaces,
  getPlace,
  editPlace,
};
