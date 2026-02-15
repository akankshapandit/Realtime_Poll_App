require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const pollRoutes = require("./routes/pollRoutes");
const socketHandler = require("./socket/socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/poll", pollRoutes);

// Socket
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("MongoDB Connected");
  console.log(`Server running on port ${PORT}`);
});
