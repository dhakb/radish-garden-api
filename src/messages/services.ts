import Message from "../models/Message.js";

export const addMessage = async (payload) => {
  const newMessage = new Message(payload);
  return await newMessage.save();
};

export const getMessage = async (conversationId) => {
    return await Message.find({ conversationId });
}
