import express from "express";
import { createMessage, getMessage ,chatHistory,changeChatRoom, unreadCount} from "../Controllers/messageControllers.js";
import { hostAuth,guestAuth } from "../Middlewares/authMiddleware.js"; 


const router = express.Router();

// guest message routes

router.post('/guest',guestAuth,createMessage)
router.get("/guest/get-room/:userId/:hostId/:senderId",guestAuth,getMessage);
router.get("/guest/history/:id",guestAuth,chatHistory);
router.get("/guest/change-room/:roomId/:fromId",guestAuth,changeChatRoom);

// host message routes
router.post('/host',hostAuth,createMessage)
router.get("/host/get-room/:userId/:hostId/:senderId",hostAuth, getMessage);
router.get("/host/history/:id",hostAuth,chatHistory);
router.get("/host/change-room/:roomId/:fromId",hostAuth,changeChatRoom);
router.get("/host/unreaded/:id",hostAuth,unreadCount);



export default router; 