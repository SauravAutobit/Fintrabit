import { WEBSOCKET_URL } from "./utils/constants/app.constants";

let socket: WebSocket | null = null;

export function initSocket(): WebSocket {
  if (!socket) {
    socket = new WebSocket(WEBSOCKET_URL); 

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    socket.onmessage = (msg: MessageEvent) => {
      console.log("📩 Message received:", msg.data);
    };
  }
  return socket;
}

export function getSocket(): WebSocket | null {
  return socket;
}


export function sendMessage(message: object) {

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn("⚠️ Socket not connected. Cannot send message:", message);
  }
}
