import mongoose from "mongoose";

const { Schema } = mongoose;

const HostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isEmailVerified:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

const HostModel = mongoose.model("Host", HostSchema);

export default HostModel;
