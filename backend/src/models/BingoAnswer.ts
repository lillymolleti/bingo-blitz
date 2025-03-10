import mongoose, { Schema, Document } from "mongoose";

export interface IBingoAnswer extends Document {
  teckziteId: string;
  userAnswers: {
    question: string;
    option: number;
    answer: string;
  }[];
  submittedAt: Date;
}

const bingoAnswerSchema = new Schema<IBingoAnswer>({
  teckziteId: { type: String, required: true,unique:true },
  userAnswers: [
    {
      question: { type: String, required: true },
      option: { type: Number, required: true },
      answer: { type: String, required: true }
    }
  ],
  submittedAt: { type: Date, default: Date.now }
});

export const BingoAnswerModel = mongoose.model<IBingoAnswer>("BingoAnswer", bingoAnswerSchema);
