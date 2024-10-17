require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(error);

const server = require("http").createServer(app);

//socket connection;
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://webrtc-client-bl47.onrender.com/",
    ],
  },
});
const PORT = 3000 || process.env.PORT;

io.on("connection", (socket) => {
  console.log("connect server");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

function error(err, req, res, next) {
  // log it
  if (!test) console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send("Internal Server Error");
}

server.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
