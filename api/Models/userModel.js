import mongoose from "mongoose";


const {Schema} = mongoose;

const UserSchema = new Schema({ 
   name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  imagePath:{
    type:String,
  },
  blocked:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true
})

const UserModel = mongoose.model('User',UserSchema)

export default UserModel;