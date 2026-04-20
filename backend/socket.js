import { Server } from "socket.io";

import { finalizeArrivedResponses } 
from "./controllers/responseController.js";

let io;
let finalizeIntervalStarted = false; // 🛡️ guard

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      // origin: process.env.CLIENT_URL,
      // methods: ["GET", "POST"],
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("join-hospital", (hospitalId) => {
      socket.join(`hospital:${hospitalId}`);
      console.log(`Hospital ${hospitalId} joined room`);
    });

    socket.on("join-accident", (accidentId) => {
      socket.join(`accident:${accidentId}`);
      console.log(`Joined accident room ${accidentId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  // ✅ START FINALIZER ONLY ONCE
  if (!finalizeIntervalStarted) {
    finalizeIntervalStarted = true;

    setInterval(async () => {
      try {
        await finalizeArrivedResponses();
      } catch (err) {
        console.error("Finalize error:", err);
      }
    }, 30 * 1000);

    console.log("🕒 Finalize response scheduler started");
  }

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
