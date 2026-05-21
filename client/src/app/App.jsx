import { useEffect } from "react";
import { socket } from "../socket";
import AppRouter from "./router";

export default function App() {
  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("disconnect", () => {});
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return <AppRouter />;
}
