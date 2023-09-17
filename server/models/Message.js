import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  firstSender: {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    picturePath: {
      type: String,
    },
  },
  secondSender: {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    picturePath: {
      type: String,
    },
  },
  messages: [
    {
      senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
      },
    },
  ],
});

const Messages = mongoose.model("Message", messageSchema);

export default Messages;
