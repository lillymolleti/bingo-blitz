import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  teckziteId: string;
  branch:string;
  emailId:string;
  place?:string;
  phone?:string;
}

const teckziteUserSchema = new Schema<IUser>({
  teckziteId: {
    type: String,
    required: true,
    unique: true,
  },
  branch:String,
  emailId:String,
  place:String,
  phone:String
});
export const teckziteUserModel = mongoose.model<IUser>(
  "TeckziteUser",
  teckziteUserSchema
);

