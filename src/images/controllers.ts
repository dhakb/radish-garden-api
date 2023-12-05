import * as ImagesController from "../images/services.js";

export const uploadImage = async (req, res) => {
  try {
    const response = await ImagesController.uploadImage(req.file);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getImage = async (req, res) => {
  try {
    const readStream = await ImagesController.getImage(req.params);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json(err);
  }
};
