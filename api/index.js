import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import hostRoutes from "./Routes/hostRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import connectDB from "./Config/dbConfig.js";
import { Server } from "socket.io";
import { notFound, errorHandler } from "./Middlewares/errorMiddleware.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/Uploads", express.static(__dirname + "/Uploads"));

app.use("/guest", userRoutes);
app.use("/host", hostRoutes);
app.use("/admin", adminRoutes);
app.use("/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const basePath = path.dirname(__dirname);
  app.use(express.static(path.join(basePath, "client/dist")));

  app.get("*", function (req, res) {
    const indexPath = path.join(basePath, "client/dist/index.html");

    res.sendFile(indexPath, function (err) {
      if (err) {
        console.error("Error sending index.html:", err);
        res.status(500).send(err);
      } else {
        console.log("Index.html send successfully");
      }
    });
  });
} else {
  app.get("/test", (req, res) => {
    res.json("test ok");
  });
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`server started on port ${port}`)
);

// socket io initialization

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    Credential: true,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (data) => {
    const user = onlineUsers.filter((user) => user.userId === data.to);

    if (user.length > 0) {
      io.to(user[0].socketId).emit("newMessage", data.message, data.from);
      io.to(user[0].socketId).emit("updateList", data.from, data.chatId);
    }
  });

  socket.on("updateUnread", (info) => {
    const user = onlineUsers.filter((user) => user.userId === info._id);
    if (user.length > 0) {
      io.to(user[0].socketId).emit("notification");
    }
  });
});
