import express from "express";
import { registerUser, userAuth, userInfo, userLogout, userGoogleLogin,userValidation,editProfile } from "../Controllers/userControllers.js";
import { getPlace } from "../Controllers/placeControllers.js";
import {
  bookPlace,
  isAvailable,
  getUserBookings,
  cancelBooking,
  placeWiseBooking,

} from "../Controllers/bookingControllers.js";
import { guestAuth } from "../Middlewares/authMiddleware.js";
import { payment } from "../Controllers/paymentController.js";


const router = express.Router();

router.post('/register', registerUser)
router.post('/auth', userAuth)
router.post('/logout', userLogout)
router.post("/google-login",userGoogleLogin);
router.get('/guestinfo', userInfo)
router.get('/place-details/:id',getPlace)
router.post("/bookings",guestAuth,bookPlace);
router.post("/place-available",isAvailable);
router.post("/create-checkout-session",payment);
router.get('/bookings',guestAuth,getUserBookings)
router.put("/cancel-booking",cancelBooking); 
router.get('/booked-dates',placeWiseBooking);
router.post("/edit-form",userValidation);
router.post("/edit-profile",editProfile);
  


export default router; 