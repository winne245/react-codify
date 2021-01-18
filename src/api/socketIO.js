import io from "socket.io-client";
let socket;
const ENDPOINT = "http://localhost:9000";

export const initiateSocket = (room) => {
  socket = io.connect(ENDPOINT, { reconnection: true });
  console.log(`Connecting socket... ${socket}`);

  if (socket && room) {
    socket.emit("join", room);
    socket.emit("load", room);
  }
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const subscribeToComment = (cb) => {
  if (!socket) return true;
  // Get message from the socket
  socket.on("new-comment", (comment) => {
    console.log("Websocket event received!");
    return cb(null, comment);
  });
};

export const loadOldComments = (cb) => {
  if (!socket) return true;
  socket.on("load-old-comment", (oldComments) => {
    return cb(null, oldComments);
  });
};

export const sendComment = (comment) => {
  if (socket) socket.emit("comment", comment);
};
