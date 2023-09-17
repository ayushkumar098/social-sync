import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createChat, getFriends } from "../controllers/chat.js";


const router = express.Router();

router.get("/getFriends/:userId", verifyToken, getFriends);

router.post("/createChat", verifyToken, createChat);
export default router;