import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createChat,
  getAllUsers,
  updateMessages,
  getMessages,
  addMessage
} from "../controllers/chat.js";


const router = express.Router();

router.get("/getusers/:userId", verifyToken, getAllUsers);

router.patch("/addNewMessage", verifyToken, updateMessages);

router.post("/createChat", verifyToken, createChat);

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
export default router;