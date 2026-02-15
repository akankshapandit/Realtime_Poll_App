module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinPoll", (pollId) => {
      socket.join(pollId);
    });

    socket.on("vote", (pollId, pollData) => {
      io.to(pollId).emit("updateResults", pollData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
