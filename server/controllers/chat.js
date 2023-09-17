import Messages from "../models/Message.js";

// GET ->send chat bar list
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const friendsChatList = await Messages.find({ conversationId: { $regex : userId} });

    const filteredArray = friendsChatList.map((message) => {
      // Check if userId matches firstSender's userId
      if (message.firstSender.userId === userId) {
        // Omit firstSender
        const { firstSender, ...rest } = message._doc;
        return { ...rest, sender: { ...message.secondSender } };
      } else {
        // Omit secondSender
        const { secondSender, ...rest } = message._doc;
        return { ...rest, sender: { ...message.firstSender } };
      } 
    })
    console.log(filteredArray);
    res.status(200).json(filteredArray);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

//POST ->Create new conversation if it doesn't already exists
export const createChat = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const isConversation = await Messages.findOne({conversationId});
    // console.log(isConversation);
    if (isConversation) {
      res.status(200).json( isConversation );
    } else {
      const newConversation = new Messages(req.body);
      await newConversation.save();
      res.status(200).json( isConversation );
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
