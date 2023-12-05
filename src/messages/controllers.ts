import * as MessagesService from "../messages/services.js";

export const addMessage = async (req, res) => {
  try {
    const response = await MessagesService.addMessage(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const response = await MessagesService.getMessages(conversationId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(500);
  }
};
