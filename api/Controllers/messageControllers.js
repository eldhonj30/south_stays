import asyncHandler from "express-async-handler";
import MessageModel from "../Models/messageModel.js";
import ChatRoomModel from "../Models/chatRoomModel.js";

const createMessage = asyncHandler(async (req, res) => {
  try {
    const { userId,hostId,senderId,message } = req.body;
    let chatid;
   const chatHistory = await ChatRoomModel.findOne({
     $and: [{ userId: userId }, { hostId: hostId }]
   });

    if (chatHistory) {
      await ChatRoomModel.findByIdAndUpdate(chatHistory._id, {
        $set: { latestmessage: message },
      });
      chatid = chatHistory._id;
    } else {
      const newChat = await ChatRoomModel.create({
        userId,
        hostId,
        latestmessage: message,
      });
      chatid = newChat._id;
    }
    const newMessage = await MessageModel.create({
      message,
      chatid,
      sender: senderId,
    });
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal servor error");
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    let allMessage = [];
    const {userId,hostId,senderId} = req.params

    const chatHistory = await ChatRoomModel.findOne({$and:[{userId:userId},{hostId:hostId}]})

    if (chatHistory) {
      const newMessage = await MessageModel.find({
        chatid: chatHistory._id,
      }).sort({ updatedAt: 1 });

      allMessage = newMessage.map((msg) => {
        return {
          mySelf: msg.sender.toString() === senderId,
          message: msg.message,
        };
      });
    }

    return res.status(200).json({ allMessage });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
});

const chatHistory = asyncHandler(async (req,res) => {
  try {
      const {id} = req.params
      const prevChatRooms = await ChatRoomModel.find({
        $or: [{ userId: id }, { hostId: id }],
      })
        .sort({ updatedAt: -1 })
        .populate("userId", "name")
        .populate("hostId", "name");
      if(prevChatRooms.length > 0 ){
        res.status(201).json(prevChatRooms);
      } else {
        res.status(200).json('No history')
      }
  } catch (error) {
    console.log(error)
  }

})

const changeChatRoom = asyncHandler(async (req,res) => {
  
 const {roomId,fromId} = req.params

  const newMessage = await MessageModel.find({
       chatid: roomId,
     }).sort({ updatedAt: 1 });

  const allMessage = newMessage.map((msg) => {
       return {
         mySelf: msg.sender.toString() === fromId,
         message: msg.message,
       };
     });

    return res.status(200).json({ allMessage});

}) 

export { createMessage, getMessage,chatHistory,changeChatRoom };
