const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const { Server } = require("socket.io");

const { TeacherLogin } = require("./controllers/login.js");
const {
  createPoll,
  voteOnOption,
  getPolls,
} = require("./controllers/poll.js");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_URL;
let dbReady = false;

mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

mongoose.connection.once("open", () => {
  dbReady = true;
});
app.use((req, res, next) => {
  if (!dbReady) {
    return res.status(503).json({
      message: "Database not connected yet",
    });
  }
  next();
});
 

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let votes = {};
let connectedUsers = {};

io.on("connection", (socket) => {
  socket.on("createPoll", async (pollData) => {
    votes = {};
    const poll = await createPoll(pollData);
    io.emit("pollCreated", poll);
  });

  socket.on("kickOut", (userToKick) => {
    for (let id in connectedUsers) {
      if (connectedUsers[id] === userToKick) {
        io.to(id).emit("kickedOut", { message: "You have been kicked out." });
        const userSocket = io.sockets.sockets.get(id);
        if (userSocket) {
          userSocket.disconnect(true);
        }
        delete connectedUsers[id];
        break;
      }
    }
    io.emit("participantsUpdate", Object.values(connectedUsers));
  });

  socket.on("joinChat", ({ username }) => {
    connectedUsers[socket.id] = username;
    io.emit("participantsUpdate", Object.values(connectedUsers));

    socket.on("disconnect", () => {
      delete connectedUsers[socket.id];
      io.emit("participantsUpdate", Object.values(connectedUsers));
    });
  });

  socket.on("studentLogin", (name) => {
    socket.emit("loginSuccess", { message: "Login successful", name });
  });

  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("submitAnswer", async (answerData) => {
    votes[answerData.option] = (votes[answerData.option] || 0) + 1;
    await voteOnOption(answerData.pollId, answerData.option);
    io.emit("pollResults", votes);
  });
});
 

app.get("/", (req, res) => {
  res.send("Polling System Backend");
});

app.post("/teacher-login", TeacherLogin);

app.get("/polls/:teacherUsername", getPolls);

 
server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
