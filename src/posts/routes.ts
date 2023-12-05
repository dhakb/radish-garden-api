import { Router } from "express";
import * as PostControllers from "../posts/controllers.js";

const route = Router();

route.post("/", PostControllers.cretePost);
route.put("/:id", PostControllers.editPost);
route.delete("/:id", PostControllers.deletePost);
route.put("/:id/like", PostControllers.likePost);
route.get("/:id", PostControllers.getSinglePost);
route.get("/timeline/:userId", PostControllers.getTimelinePosts);
route.get("/profile/:username", PostControllers.getUserAllPost);

export default route;
