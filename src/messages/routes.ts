import { Router } from "express";
import * as MessagesControlles from "../messages/controllers.js";

const route = Router();

route.post("/", MessagesControlles.addMessage);
route.get("/:conversationId", MessagesControlles.getMessage);

export default route;
