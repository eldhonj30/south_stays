import jwt from "jsonwebtoken";
import hostModel from "../Models/hostModel.js";
import userModel from "../Models/userModel.js";
import AdminModel from "../Models/adminModel.js";

const guestAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      req.user = await userModel.findById(user.id).select("-password");

      next();
    });
  } else {
    res.status(401).json({ message: "invalid autherization" });
  }
};

const hostAuth = (req, res, next) => {
  const { host } = req.cookies;

  if (host) {
    jwt.verify(host, process.env.JWT_SECRET, {}, async (err, hostDetails) => {
      if (err) throw err;

      req.hostD = await hostModel.findById(hostDetails.id).select("-password");

      next();
    });
  } else {
    res.status(401).json({ message: "invalid autherization" });
  }
};

const adminAuth = (req, res, next) => {
  const { admin } = req.cookies;

  if (admin) {
    jwt.verify(admin, process.env.JWT_SECRET, {}, async (err, adminD) => {
      if (err) throw err;

      req.admin = await AdminModel.findById(adminD.id).select("-password");

      next();
    });
  } else {
    res.status(401).json({ message: "invalid autherization" });
  }
};

export { guestAuth, hostAuth, adminAuth };
