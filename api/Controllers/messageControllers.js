import asyncHandler from "express-async-handler";
import MessageModel from "../Models/messageModel.js";
import UserModel from "../Models/userModel.js";
import HostModel from "../Models/hostModel.js"



const createMessage = asyncHandler( async (req,res) => {
  
  try {
    
    const {from,to,message} = req.body

    const newMessage = await MessageModel.create({
      message:message,
      chatusers:[from,to],
      sender:from
    })

    return res.status(200).json(newMessage)

  } catch (error) {
    return res.status(500).json('Internal servor error')
  }

})

const getMessage = asyncHandler( async (req,res) => {

  try {
    const from = req.params.user1Id
    const to = req.params.user2Id

    const newMessage = await MessageModel.find({
        chatusers:{
          $all:[from,to]
        }
    }).sort({updatedAt:1}); 

    const allMessage = newMessage.map((msg) => {
      return {
        mySelf:msg.sender.toString() === from,
        message:msg.message,
      }
    })

    
   let receiver = await UserModel.findById(to).select({ name: 1, email: 1 });
   if(!receiver) {
    receiver = await HostModel.findById(to).select({ name: 1, email: 1 });
   }
   
    return res.status(200).json({allMessage,receiver})

  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error")
  }
})







export {createMessage,getMessage}