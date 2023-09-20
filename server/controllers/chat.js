import Messages from "../models/Message.js";
import User from "../models/User.js";
//const combinedId = friendId > user._id ? friendId + user._id : user._id + friendId;

// GET ->send chat bar list
export const getAllUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "firstName",
      "lastName",
      "picturePath",
      "_id",
    ]);
    return res.json(users);
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

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};