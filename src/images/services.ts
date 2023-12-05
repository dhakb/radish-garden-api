import fs from "node:fs";
import Image from "../models/Image.js";

export const uploadImage = async (image) => {
  let newImage = new Image({
    filename: image.filename,
    originalName: image.originalname,
    path: image.path,
    mimetype: image.mimetype,
  });

  return await newImage.save();
};

export const getImage = async (params) => {
  const image = await Image.findOne({ filename: params.filename });
  const { filename } = image;

  return fs.createReadStream(`./uploads/${filename}`);
};
