import Conversation from "../models/Conversation.js";

export const addConversation = async (senderId, receiverId) => {
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  return newConversation.save();
};

export const getConversation = async (userId) => {
  return Conversation.find({ members: userId });
};

export const getConversationOfTwo = async (userOneId, userTwoId) => {
  return Conversation.findOne({
    members: { $all: [userOneId, userTwoId] },
  });
};
