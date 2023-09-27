import asyncHandler from "express-async-handler";
import BookingModel from "../Models/bookingModel.js";

const bookPlace = asyncHandler(async (req, res) => {
  const {
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    place,
    user,
    owner,
    price,
  } = req.body.bookingData;
  const booked = await BookingModel.findOne({
    place: place,
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

  if (!booked) {
    BookingModel.create({
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place,
      user,
      owner,
      price,
    })
      .then((doc) => {
        res.status(201).json(doc._id);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.json(true)
  }
});

const isAvailable = asyncHandler(async (req, res) => {
  const { checkIn, checkOut, place } = req.body;

  const booked = await BookingModel.findOne({
    place: place,
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
  if (booked) {
    res.json(false);
  } else {
    res.json(true);
  }
});

const placeWiseBooking = asyncHandler(async (req, res) => {
  const id = req.query.place;

  const bookings = await BookingModel.find({
    $and: [{ place: id }, { status: "booked" }]
  }).select('checkIn checkOut id');

  res.status(201).json(bookings);
});

const getUserBookings = asyncHandler(async (req, res) => {
  let userId;
  if (req?.user) {
    userId = req.user._id;
  } else {
    userId = req.query.id;
  }

  const bookings = await BookingModel.find({ user: userId }).populate("place");

  res.status(201).json(bookings);
});

const gethostBookings = asyncHandler(async (req, res) => {
  let hostId;

  if (req?.hostD) {
    hostId = req.hostD._id;
  } else {
    hostId = req.query.id;
  }

  const bookings = await BookingModel.find({ owner: hostId }).populate("place");
  res.status(201).json(bookings);
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  const date = new Date();
  const booking = await BookingModel.findByIdAndUpdate(id);

  if (booking.checkIn > date) {
    booking.status = status;
    booking.save();
    res.json(true);
  } else {
    res.json(false);
  }
});

export {
  bookPlace,
  isAvailable,
  getUserBookings,
  gethostBookings,
  cancelBooking,
  placeWiseBooking,
};