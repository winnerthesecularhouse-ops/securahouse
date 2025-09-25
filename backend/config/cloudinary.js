import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Ensure environment variables are loaded even if this module is imported
// before server.js runs dotenv.config()
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
