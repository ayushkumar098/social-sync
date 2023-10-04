import express from "express";
import {
  getUsersList,
  getUser,
  getUserFriends,
  getUserNotFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/",getUsersList);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/notFriends", verifyToken, getUserNotFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;