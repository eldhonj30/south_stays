import express from "express";
import { createMessage, getMessage ,chatHistory,changeChatRoom} from "../Controllers/messageControllers.js"; 



const router = express.Router();

router.post('/guest',createMessage)
router.get("/chat/get-room/:userId/:hostId/:senderId", getMessage);
router.get("/history/:id",chatHistory);
router.get("/chat/change-room/:roomId/:fromId",changeChatRoom); 




export default router; 