import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Host",
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  perks: {
    type: [String],
    required: true,
  },
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  checkOut: {
    type: Number,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  location: {
    type: Object,
    enum: ["Point"],
    required: true,
  },
});

PlaceSchema.index({ location: "2dsphere" });

const PlaceModel = mongoose.model("Place", PlaceSchema);

export default PlaceModel;
