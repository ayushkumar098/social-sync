import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    //ref: "User", // Reference to the User model (if you have one)
    required: true,
  },
  commenterFirstName: {
    type: String,
    required: true,
  },
  commenterLastName: {
    type: String,
    required: true,
  },
  commenterPicturePath:{
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
});

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;