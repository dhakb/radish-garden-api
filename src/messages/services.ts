import Message from "../models/Message.js";

export const addMessage = async (payload) => {
  const newMessage = new Message(payload);
  return newMessage.save();
};

export const getMessages = async (conversationId) => {
  return Message.find({ conversationId });
};
