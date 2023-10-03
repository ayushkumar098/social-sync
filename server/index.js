import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
//import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import chatRouter from "./routes/chat.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.get("/check", (req, res) => {
  res.status(200).json({ check: "hello world" });
});

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/chat", chatRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((error) => console.log(`${error} did not connect`));

const server = http.createServer(app);
// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    console.log("user-Added");
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);