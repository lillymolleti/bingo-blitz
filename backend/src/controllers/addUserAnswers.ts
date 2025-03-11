import { Request, Response, NextFunction } from "express";
import { BingoAnswerModel } from "../models/BingoAnswer";
import { teckziteUserModel } from "../models/teckziteUserModel";

export const addUserAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teckziteId, userAnswers } = req.body;

    if (!teckziteId || !Array.isArray(userAnswers) || userAnswers.length === 0) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // Validate each answer object
    for (const answer of userAnswers) {
      if (!answer.question || typeof answer.option !== "number" || !answer.answer) {
        return res.status(400).json({ message: "Invalid answer format" });
      }
    }

    // Check if the user has already submitted answers
    const existingSubmission = await BingoAnswerModel.findOne({ teckziteId });
    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "User has already submitted answers" });
    }
    const teckziteUser = await teckziteUserModel.findOne({teckziteId});
    if (!teckziteUser) {
      return res
        .status(400)
        .json({ message: "User does not exists" });
    }

    // Store answers
    const bingoAnswer = new BingoAnswerModel({
      userId:teckziteUser._id,
      teckziteId:teckziteUser.teckziteId,
      userAnswers,
      submittedAt: new Date(),
    });

    await bingoAnswer.save();

    return res.status(201).json({ message: "Submitted successfully" });
  } catch (error) {
    console.error("Error storing answers:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
