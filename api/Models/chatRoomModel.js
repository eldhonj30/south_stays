import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    latestmessage: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      require: true,
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Host",
      require: true,
    }
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema);

export default ChatRoomModel;
