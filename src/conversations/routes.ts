import { Router } from "express";
import * as ConversationControllers from "../conversations/controllers.js";

const route = Router();

route.post("/", ConversationControllers.addConversation);
route.get("/:userId", ConversationControllers.getConversation);
route.get("/:userOneId/:userTwoId", ConversationControllers.getConversationOfTwo);

export default route;
