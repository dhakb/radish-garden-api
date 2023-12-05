import { Router } from "express";
import * as MessagesControllers from "../messages/controllers.js";

const route = Router();

route.post("/", MessagesControllers.addMessage);
route.get("/:conversationId", MessagesControllers.getMessages);

export default route;
