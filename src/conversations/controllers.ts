import * as ConversationsService from "../conversations/services.js";

export const addConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const response = await ConversationsService.addConversation(
      senderId,
      receiverId,
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const userConversations =
      await ConversationsService.getConversation(userId);
    res.status(200).json(userConversations);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConversationOfTwo = async (req, res) => {
  const { userOneId, userTwoId } = req.params;

  try {
    const conversation = await ConversationsService.getConversationOfTwo(
      userOneId,
      userTwoId,
    );
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
