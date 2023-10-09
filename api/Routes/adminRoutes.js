import express from "express";
import { getAllPlaces } from "../Controllers/placeControllers.js";
import { allHosts, hostBlockUnBlock } from "../Controllers/hostControllers.js";
import { allUsers, blockUnblock } from "../Controllers/userControllers.js";
import {
  adminLogin,
  adminInfo,
  adminLogout,
  dashboardCount,
  bargraph,
} from "../Controllers/adminControllers.js";
import {
  getUserBookings,
  gethostBookings,
} from "../Controllers/bookingControllers.js";
import { adminAuth } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/admininfo", adminAuth, adminInfo);
router.post("/logout", adminLogout);
router.get("/dashboard/counts", adminAuth, dashboardCount);
router.get("/dashboard/bargraph",adminAuth,bargraph);

router.get("/all-places", getAllPlaces);
router.get("/all-users", adminAuth, allUsers);
router.post("/block-manage", adminAuth, blockUnblock);

router.get("/all-hosts", adminAuth, allHosts);
router.post("/host-manage", adminAuth, hostBlockUnBlock);
router.get("/user-bookings", adminAuth, getUserBookings);
router.get("/host-bookings", adminAuth, gethostBookings);

export default router;
