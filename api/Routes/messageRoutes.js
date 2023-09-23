import express from "express";
import { createMessage, getMessage} from "../Controllers/messageControllers.js"; 



const router = express.Router();

router.post('/guest',createMessage)
router.get('/get/:user1Id/:user2Id',getMessage)





export default router; 