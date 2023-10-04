import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import AdminModel from "../Models/adminModel.js";
import adminToken from "../utils/adminToken.js";

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

export { adminLogin, adminInfo, adminLogout };
