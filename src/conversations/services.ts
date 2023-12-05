import Conversation from "../models/Conversation.js";

export const addConversation = async (senderId, receiverId) => {
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  return await newConversation.save();
};

export const getConversation = async (userId) => {
  return await Conversation.find({ members: userId });
};

export const getConversationOfTwo = async (userOneId, userTwoId) => {
  return await Conversation.findOne({
    members: { $all: [userOneId, userTwoId] },
  });
};
