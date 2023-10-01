import express from "express";
import { createMessage, getMessage ,chatHistory,changeChatRoom, unreadCount} from "../Controllers/messageControllers.js";
import { hostAuth } from "../Middlewares/authMiddleware.js"; 



const router = express.Router();

router.post('/guest',createMessage)
router.get("/chat/get-room/:userId/:hostId/:senderId", getMessage);
router.get("/history/:id",chatHistory);
router.get("/chat/change-room/:roomId/:fromId",changeChatRoom);
router.get("/host/unreaded/:id",hostAuth,unreadCount);
 



export default router; 