import userModel from "../Models/userModel.js";

import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const bcryptSalt = await bcrypt.genSalt(10);

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  //if password is good
  if (!password || password.length < 6) {
    res.status(400);
    throw new Error("Password must contain 6 characters");
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// user login

const userAuth = asyncHandler(async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  const userExists = await userModel.findOne({ email });
  if (!userExists) {
    res.status(400);
    throw new Error("Invalid User");
  }

  if (!userExists.blocked) {
    const authUser = bcrypt.compareSync(password, userExists.password);

    if (authUser) {
      generateToken(res, userExists.email, userExists._id);
      res.status(201).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(400);
    throw new Error("You are Blocked");
  }
});
const userValidation = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password.trim();

  const userExists = await userModel.findOne({ email });
  if (!userExists) {
    res.status(400);
    throw new Error("Invalid User");
  }

  if (userExists) {
    const authUser = bcrypt.compareSync(password, userExists.password);

    if (authUser) {
      res.status(201).json({
        name: userExists.name,
        email: userExists.email,
      });
    } else {
      res.status(400);
      throw new Error("Wrong password");
    }
  }
});

const editProfile = asyncHandler(async (req, res) => {
  try {
    let id = req.body.id;
    const data = await userModel.findById(id);
    let password = data.password;
    let name = req.body?.name.trim() || data.name;
    if (req.body?.password.trim()) {
      password = req.body?.password.trim();
      password = bcrypt.hashSync(password, bcryptSalt);
    }

    const log = await userModel
      .findByIdAndUpdate(
        id,
        {
          $set: { name: name, password: password },
        },
        { new: true }
      )
      .select("-password");
    res.status(201).json(log);
  } catch (error) {
    console.log(error);
  }
});

// getting user information

const userInfo = asyncHandler((req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const userD = await userModel.findById(user.id);
      if (userD?.blocked) {
        res.status(201).json(false);
      } else {
        res.json({ name: userD.name, email: userD.email, _id: userD._id });
      }
    });
  } else {
    res.status(401);
    throw new Error();
  }
});

// userlogout

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

const userGoogleLogin = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    generateToken(res, user.email, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    const password = "123456";
    const userCreadted = await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    generateToken(res, userCreadted.email, userCreadted._id);
    res.status(201).json({
      _id: userCreadted._id,
      name: userCreadted.name,
      email: userCreadted.email,
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.status(201).json(users);
});

const blockUnblock = asyncHandler(async (req, res) => {
  const { id, block } = req.body;

  try {
    if (block) {
      await userModel.findByIdAndUpdate(id, { $set: { blocked: false } });
    } else {
      await userModel.findByIdAndUpdate(id, { $set: { blocked: true } });
    }
    const data = await userModel.find({});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
});

export {
  registerUser,
  userAuth,
  userInfo,
  userLogout,
  userGoogleLogin,
  allUsers,
  blockUnblock,
  userValidation,
  editProfile,
};
