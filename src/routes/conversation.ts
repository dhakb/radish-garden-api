import { Router } from "express";
import Conversation from "../models/Conversation";

const route = Router();

// Add Conversation
route.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const response = await newConversation.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Conversation
route.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userConversations = await Conversation.find({ members: userId });
    res.status(200).json(userConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get conversation of two users
route.get("/:userOneId/:userTwoId", async (req, res) => {
  const { userOneId, userTwoId } = req.params;

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [userOneId, userTwoId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default route;
