import { Router } from "express";
import * as PostsConrtollers from "../posts/controllers.js";

const route = Router();

route.post("/", PostsConrtollers.cretePost);
route.put("/:id", PostsConrtollers.editPost);
route.delete("/:id", PostsConrtollers.deletePost);
route.put("/:id/like", PostsConrtollers.likePost);
route.get("/:id", PostsConrtollers.getSinglePost);
route.get("/timeline/:userId", PostsConrtollers.getTimelinePosts);
route.get("/profile/:username", PostsConrtollers.getUserAllPost);

export default route;
