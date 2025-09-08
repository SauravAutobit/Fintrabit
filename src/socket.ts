import { WEBSOCKET_URL } from "./utils/constants/app.constants";

export interface SocketMessage {
  rid: string;
  target: string;
  session: string;
  payload: {
    data?: unknown; // Use 'unknown' for data that can vary. It's safer than 'any'.
    message: string;
    status: 'success' | 'failed';
  };
}


let socket: WebSocket | null = null;
// This array will hold all the callback functions from our components
const listeners: ((data: SocketMessage) => void)[] = [];

export function initSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(WEBSOCKET_URL); 

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      //  setTimeout(() => {
      //   socket = null; 
      //   initSocket(); 
      // }, 2000);
      socket = null;
      setTimeout(initSocket, 2000); // Reconnect after 2 seconds
    };

    socket.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
       socket?.close();
    };

    socket.onmessage = (msg: MessageEvent) => {
      console.log("📩 Message received:", msg.data);
    try {
        const parsedData = JSON.parse(msg.data);
        console.log("📩 Message received:", parsedData);
        // This is the key: notify all registered listeners
        listeners.forEach((cb) => cb(parsedData));
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
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

// Allow components to register for messages
export function addMessageListener(cb: (data: SocketMessage) => void) {
  listeners.push(cb);
  // Return a cleanup function to remove the listener
  return () => {
    const index = listeners.indexOf(cb);
    if (index > -1) listeners.splice(index, 1);
  };
}