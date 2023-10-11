import hostModel from "../Models/hostModel.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import asyncHandler from "express-async-handler";
import hostToken from "../utils/hostToken.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { getOtp, getMsg } from "../utils/commonUtils.js";
import BookingModel from "../Models/bookingModel.js";

const bcryptSalt = await bcrypt.genSalt(10);

const transporter = nodeMailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brandt78@ethereal.email",
    pass: "Bwn21KceJwwdnp5zsk",
  },
});

// host signup

const hostSignup = asyncHandler(async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  //if password is good
  if (!password || password.length < 6) {
    res.status(400);
    throw new Error("Password must contain 6 characters");
  }

  const hostExists = await hostModel.findOne({ email });

  if (hostExists) {
    if (hostExists?.isEmailVerified) {
      res.status(400);
      throw new Error("email already taken");
    } else {
      await hostModel.findOneAndUpdate(
        { email: hostExists.email },
        {
          $set: {
            name,
            password: bcrypt.hashSync(password, bcryptSalt),
          },
        }
      );

      let otp = await getOtp();
      req.app.locals.OTP = otp;
      req.app.locals.EMAIL = hostExists.email;

      const message = getMsg(otp.otpValue);

      transporter
        .sendMail(message)
        .then(() => {
          res.status(201).json({ message: "otp is send to your mail" });
        })
        .catch(() => {
          res.status(500);
          throw new Error("email sending failed");
        });
    }
  } else {
    const host = await hostModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    if (host) {
      let otp = await getOtp();
      req.app.locals.OTP = otp;
      req.app.locals.EMAIL = email;
      const message = getMsg(otp.otpValue);
      transporter
        .sendMail(message)
        .then(() => {
          res.status(201).json({
            message: "otp is send to your mail",
          });
        })
        .catch(() => {
          res.status(500);
          throw new Error("email sending failed");
        });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const resentOtp = asyncHandler(async (req, res) => {
  let otp = await getOtp();
  req.app.locals.OTP = otp;

  const message = getMsg(otp.otpValue);

  transporter
    .sendMail(message)
    .then(() => {
      res.status(201).json({
        message: "otp is send to your mail",
      });
    })
    .catch(() => {
      res.status(500);
      throw new Error("email sending failed");
    });
});

const verifyOtp = asyncHandler(async (req, res) => {
  let { otp } = req.body;
  let { otpValue, otpTimestamp } = req.app.locals.OTP;
  const otpValidDurationMs = 1 * 60 * 1000;
  const currentTimestamp = new Date().getTime();
  let otpValidity = currentTimestamp - otpTimestamp;

  if (otpValue === otp && otpValidity <= otpValidDurationMs) {
    let email = req.app.locals.EMAIL;
    await hostModel.findOneAndUpdate(
      { email },
      { $set: { isEmailVerified: true } }
    );
    req.app.locals.EMAIL = null;
    req.app.locals.OTP = null;
    res.status(201).json({ message: "email verified" });
  } else {
    res.status(401);
    throw new Error("Invalid otp");
  }
});

// host login

const hostLogin = asyncHandler(async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  const hostExists = await hostModel.findOne({ email });

  if (hostExists?.blocked) {
    res.status(401);
    throw new Error("You are blocked");
  }

  if (hostExists?.isEmailVerified) {
    const authHost = bcrypt.compareSync(password, hostExists.password);

    if (authHost) {
      hostToken(res, hostExists.email, hostExists._id);
      res.status(201).json({
        _id: hostExists._id,
        name: hostExists.name,
        email: hostExists.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// host info

const hostInfo = asyncHandler((req, res) => {
  const { host } = req.cookies;

  if (host) {
    jwt.verify(host, process.env.JWT_SECRET, {}, async (err, hostDetails) => {
      if (err) throw err;

      const hostD = await hostModel.findById(hostDetails.id);
      if (hostD?.blocked) {
        res.cookie("host", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        res.json(false);
      } else {
        res.json({ name: hostD.name, email: hostD.email, _id: hostD._id });
      }
    });
  } else {
    res.status(400);
    throw new Error("invalid token");
  }
});

const hostLogout = asyncHandler(async (req, res) => {
  res.cookie("host", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "host Logged Out" });
});

const allHosts = asyncHandler(async (req, res) => {
  try {
    const data = await hostModel.find({});
    res.status(201).json(data);
  } catch (error) {}
});

const hostBlockUnBlock = asyncHandler(async (req, res) => {
  const { id, block } = req.body;

  try {
    if (block) {
      await hostModel.findByIdAndUpdate(id, { $set: { blocked: false } });
    } else {
      await hostModel.findByIdAndUpdate(id, { $set: { blocked: true } });
    }
    const data = await hostModel.find({});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
});

const tileData = asyncHandler(async (req, res) => {
  const { _id } = req.hostD;
  try {
    const summary = await BookingModel.aggregate([
      {
        $match: { owner: _id },
      },
      {
        $group: {
          _id: "$owner",
          totalBookings: { $sum: 1 },
          totalIncome: { $sum: "$price" },
        },
      },
    ]);

    const lastMonth = await BookingModel.aggregate([
      {
        $match: {
          owner: _id,
          checkIn: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: "$owner",
          count: { $sum: 1 },
        },
      },
    ]);
    const todays = await BookingModel.find({
      $and: [
        { owner: _id },
        { checkIn: new Date() },
        { status: { $ne: "cancelled" } },
      ],
    }).countDocuments();

    res.status(201).json({ summary, lastMonth, todays });
  } catch (error) {
    console.log(error);
  }
});

const monthlyIncome = asyncHandler(async (req, res) => {
  const { _id } = req.hostD;
  try {
    const revenue = await BookingModel.aggregate([
      {
        $match: {
          status: "Checked-out",
          owner: _id,
        },
      },
      {
        $addFields: {
          month: { $month: "$checkOut" },
        },
      },
      {
        $group: {
          _id: { month: "$month" },
          price_monthly: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          price_monthly: 1,
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
  const { _id } = req.hostD;
  const booking = await BookingModel.aggregate([
    {
      $match: {
        owner: _id
      },
    },
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

export {
  hostSignup,
  hostLogin,
  hostInfo,
  hostLogout,
  verifyOtp,
  resentOtp,
  allHosts,
  hostBlockUnBlock,
  tileData,
  monthlyIncome,
  monthlyBookings
};
