import mongoose from "mongoose";
import moment from "moment-timezone";

// const messageSchema = mongoose.Schema({
//   conversationId: {
//     type: String,
//   },
//   firstSender: {
//     userId: {
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//     picturePath: {
//       type: String,
//     },
//   },
//   secondSender: {
//     userId: {
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//     picturePath: {
//       type: String,
//     },
//   },
//   messages: [
//     {
//       senderId: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//       },
//       created_at: {
//         type: Date,
//         default: () => moment().tz('Asia/Kolkata').format(),
//       },
//       text: {
//         type: String,
//       },
//     },
//   ],
// });

const messageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Message", messageSchema);

export default Messages;
