function handleSocketConnected() {
  return (socket) => {
    socket.send("Welcome");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    console.log("a user connected");

    socket.on("chat_message", (data) => {
      console.log("New message", data);
      socket.to(data.room).emit("chat_message", data.msg);
    });
  };
}

export default handleSocketConnected;
