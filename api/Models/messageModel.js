import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  
  chatid:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
  },
  message:{
    type:String,
    require:true
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
  }
  
},{timestamps:true});

const MessageModel = mongoose.model('Message',messageSchema)

export default MessageModel;