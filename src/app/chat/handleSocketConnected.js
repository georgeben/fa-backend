import logger from "infra/logger";

function handleSocketConnected({ saveMessage }) {
  return (socket) => {
    socket.send("Welcome");
    socket.on("disconnect", () => {
      logger.info("User disconnected");
    });

    if (socket.user) {
      socket.user.talks.forEach((talk) => socket.join(talk.toString()));
    }

    socket.on("chat_message", async (data) => {
      socket.to(data.room).emit("chat_message", { from: socket.user, text: data.msg });
      await saveMessage({ from: socket.user._id, text: data.msg, roomId: data.room });
    });
  };
}

export default handleSocketConnected;
