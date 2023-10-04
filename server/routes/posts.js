import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  createPost,
  likePost,
  getViewPost,
  addComment,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/:postId", verifyToken, getViewPost);

// POST
router.post("/", verifyToken, createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addComment);

// DELETE
router.delete("/:postId", verifyToken,deletePost);

export default router;
