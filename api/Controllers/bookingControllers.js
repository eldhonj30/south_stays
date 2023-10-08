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
        return res.status(201).json(doc._id);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return res.status(201).json(booked._id);
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
    return res.json(false);
  } else {
    return res.json(true);
  }
});

const placeWiseBooking = asyncHandler(async (req, res) => {
  const id = req.query.place;

  const bookings = await BookingModel.find({
    $and: [{ place: id }, { status: "booked" }],
  }).select("checkIn checkOut id");

  return res.status(201).json(bookings);
});

const getUserBookings = asyncHandler(async (req, res) => {
  let userId;
  if (req?.user) {
    userId = req.user._id;
  } else {
    userId = req.query.id;
  }

  const bookings = await BookingModel.find({ user: userId })
    .sort("-_id")
    .populate("place");

  return res.status(201).json(bookings);
});

const gethostBookings = asyncHandler(async (req, res) => {
  let hostId;

  if (req?.hostD) {
    hostId = req.hostD._id;
  } else {
    hostId = req.query.id;
  }

  const bookings = await BookingModel.find({ owner: hostId })
    .sort("-_id")
    .populate("place");
  return res.status(201).json(bookings);
});

const cancelBooking = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  const date = new Date();
  const booking = await BookingModel.findByIdAndUpdate(id);

  if (booking.checkIn > date) {
    booking.status = status;
    booking.save();
    return res.json(true);
  } else {
    return res.json(false);
  }
});

const confrmCheckout = asyncHandler(async (req,res) => {
  const {id} = req.body
 try {
   await BookingModel.findByIdAndUpdate(id, {
     $set: { status: "Checked-out" },
   });
   return res.status(201).json({ message: "status changed" });
 } catch (error) {
  console.log(error);
 }
})

export {
  bookPlace,
  isAvailable,
  getUserBookings,
  gethostBookings,
  cancelBooking,
  placeWiseBooking,
  confrmCheckout
};
