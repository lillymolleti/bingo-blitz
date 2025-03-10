import dotenv from "dotenv";
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
export const TECKZITE_USER_PASSWORD = process.env.TECKZITE_USER_PASSWORD;
