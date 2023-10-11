import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import AdminModel from "../Models/adminModel.js";
import adminToken from "../utils/adminToken.js";
import HostModel from "../Models/hostModel.js";
import UserModel from "../Models/userModel.js";
import PlaceModel from "../Models/placeModel.js";
import BookingModel from "../Models/bookingModel.js";

const adminLogin = asyncHandler(async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  const admin = await AdminModel.findOne({ email });

  if (admin) {
    const authAdmin = bcrypt.compareSync(password, admin.password);

    if (authAdmin) {
      adminToken(res, admin.email, admin._id);
      return res.status(201).json({
        _id: authAdmin._id,
        name: authAdmin.name,
        email: authAdmin.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const adminInfo = asyncHandler((req, res) => {
  if (req?.admin) {
    return res.status(201).json(req.admin);
  } else {
    res.status(500);
    throw new Error("invalid token");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("admin", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "User Logged Out" });
});

const dashboardCount = asyncHandler(async (req, res) => {
  try {
    const hostCount = await HostModel.find().countDocuments();
    const guestCount = await UserModel.find().countDocuments();
    const placeCount = await PlaceModel.find().countDocuments();

    return res.status(200).json({ hostCount, guestCount, placeCount });
  } catch (error) {
    console.log(error);
  }
});

const monthlyIncome = asyncHandler(async (req, res) => {
  try {
    const revenue = await BookingModel.aggregate([
      {
        $match: {
          status: "Checked-out",
        },
      },
      {
        $addFields: {
          month: { $month: "$checkOut" },
          price_10_percent: { $multiply: ["$price", 0.1] },
        },
      },
      {
        $group: {
          _id: { month: "$month" },
          price_10_percent_monthly: { $sum: "$price_10_percent" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          price_10_percent_monthly: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    return res.status(201).json(revenue);
  } catch (error) {
    console.log(error);
  }
});

const monthlyBookings = asyncHandler(async (req, res) => {
  const booking = await BookingModel.aggregate([
    {
      $addFields: {
        month: { $month: "$checkIn" },
      },
    },
    {
      $group: {
        _id: { month: "$month" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        count: 1,
      },
    },
  ]);
  return res.status(201).json(booking);
});

const placeBookings = asyncHandler(async (req, res) => {
  const bookings = await BookingModel.aggregate([
    {
      $group: {
        _id: { place: "$place" },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "places",
        localField: "_id.place",
        foreignField: "_id",
        as: "place_name",
      },
    },
    {
      $unwind: "$place_name",
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        place_name: "$place_name.title",
        count: 1,
      },
    },
  ]);
  return res.status(201).json(bookings);
});

export {
  adminLogin,
  adminInfo,
  adminLogout,
  dashboardCount,
  monthlyIncome,
  monthlyBookings,
  placeBookings,
};
