import { Router } from "express";
import * as ImagesController from "../images/controllers.js";

const route = Router();

const imageRoute = (upload) => {
  route.post("/", upload.single("file"), ImagesController.uploadImage);
  route.get("/:filename", ImagesController.getImage);

  return route;
};

export default imageRoute;
