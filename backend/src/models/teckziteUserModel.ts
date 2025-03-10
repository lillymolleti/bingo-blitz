import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  teckziteId: string;
  name?:string;
  phone?:string;
}

const teckziteUserSchema = new Schema<IUser>({
  teckziteId: {
    type: String,
    required: true,
    unique: true,
  },
  name:{
    type:String
  },
  phone:{
    type:String,
  }
});
export const teckziteUserModel = mongoose.model<IUser>(
  "TeckziteUser",
  teckziteUserSchema
);

