import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBingoAnswer extends Document {
  userId:mongoose.Types.ObjectId;
  teckziteId:string;
  userAnswers: {
    question: string;
    option: number;
    answer: string;
  }[];
  submittedAt: Date;
}

const bingoAnswerSchema = new Schema<IBingoAnswer>({
  userId:{
    type: Schema.Types.ObjectId, // Ensure this correctly refers to an ObjectId
    ref: "TeckziteUser",
    required: true,
    unique: true, // Keep this only if each user can submit only once
  },
  teckziteId:{
    type:String,unique:true
  },
  userAnswers: [
    {
      question: { type: String, required: true },
      option: { type: Number, required: true },
      answer: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const BingoAnswerModel = mongoose.model<IBingoAnswer>("BingoAnswer", bingoAnswerSchema);
