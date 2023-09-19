import Messages from "../models/Message.js";

//const combinedId = friendId > user._id ? friendId + user._id : user._id + friendId;

// GET ->send chat bar list
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const friendsChatList = await Messages.find({
      conversationId: { $regex: userId },
    });

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
    });//8667072973
    res.status(200).json(filteredArray);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//PATCH --> Add a new message

export const updateMessages = async (req, res) => {
  try {
    const { conversationId,senderId, text } = req.body;
    const latestConversation = await Messages.findOneAndUpdate(
      { conversationId },
      {
        $push: {
          messages: {
            senderId,
            text,
          },
        },
      },
      { new: true } // This option returns the updated document
    );
    res.status(200).json(latestConversation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//POST ->Create new conversation if it doesn't already exists
export const createChat = async (req, res) => {
  try {
    const { conversationId } = req.body;
    const isConversation = await Messages.findOne({ conversationId });
    // console.log(isConversation);
    if (isConversation) {
      res.status(200).json(isConversation);
    } else {
      const newConversation = new Messages(req.body);
      await newConversation.save();
      res.status(200).json(isConversation);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
