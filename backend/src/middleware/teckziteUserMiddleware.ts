// Middleware for Authentication
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { teckziteUserModel } from "../models/teckziteUserModel";
import { AuthenticatedRequest } from "../controllers/teckziteLoginHandler";
import { JWT_SECRET } from "../config";

interface DecodedToken extends JwtPayload {
  teckziteId: string;
}

export const isTeckziteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);

    console.log("JWT_SECRET:", JWT_SECRET);
    if (!JWT_SECRET) return res.status(500).json({ message: "JWT Secret is missing" });

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, JWT_SECRET!) as DecodedToken;
      console.log("Decoded Token:", decoded);
    } catch (error) {
      console.log("JWT Verify Error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    const user = await teckziteUserModel.findOne({ teckziteId: decoded.teckziteId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Middleware Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
