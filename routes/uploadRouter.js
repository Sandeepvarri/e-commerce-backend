import express from "express";
import upload from "../middleware/upload.js";
import BadRequestError from "../errors/badRequestError.js";
import cloudinary from "../utils/cloudinary.js";
import { StatusCodes } from "http-status-codes";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No file uploaded");
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "e-commerce",
  });

  res.status(StatusCodes.OK).json({ imageUrl: result.secure_url });
});

export default uploadRouter;
