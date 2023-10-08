import express from "express";
import { hostAuth } from "../Middlewares/authMiddleware.js";
import { photoUploader } from "../Middlewares/imageMiddleware.js";
import {localVariables} from '../Middlewares/commonMiddleware.js'
import {
  hostSignup,
  hostLogin,
  hostInfo,
  hostLogout,
  verifyOtp,
  resentOtp
} from "../Controllers/hostControllers.js";

import {
  imageLinkUpload,
  imageUpload,
  addPlace,
  userPlaces,
  getPlace,
  editPlace,
} from "../Controllers/placeControllers.js";

import { gethostBookings,confrmCheckout } from "../Controllers/bookingControllers.js";

const router = express.Router();

// host login-signup routes

router.post("/signup",localVariables, hostSignup);
router.post("/login", hostLogin);
router.post("/logout", hostLogout);
router.post('/otp-verify',verifyOtp) 
router.post("/otp-resend",resentOtp);

router.get("/hostInfo", hostInfo);

// host place related routes

router.post("/upload-by-link",imageLinkUpload);
router.post(
  "/upload-photos",
  hostAuth,
  photoUploader.array("photos", 100),
  imageUpload
);
router.post("/add-place", hostAuth, addPlace);
router.get("/edit-place/:id",hostAuth, getPlace);
router.put("/edit-place",hostAuth, editPlace);
router.get("/user-places", hostAuth, userPlaces);
router.get("/bookings",hostAuth,gethostBookings);
router.post("/confirm-checkout",hostAuth,confrmCheckout);

export default router;
