import { Router } from "express";
import * as CommentsController from "../comments/controllers.js";

const route = Router();

route.post("/", CommentsController.addComment);
route.get("/:postId", CommentsController.getComments);
route.delete("/:commentId", CommentsController.deleteComment);
route.get("/single/:commentId", CommentsController.getSingleComment);
route.put("/:commentId", CommentsController.updateComment);

export default route;
