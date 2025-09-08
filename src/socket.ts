let socket: WebSocket | null = null;

export function initSocket(): WebSocket {
  if (!socket) {
    socket = new WebSocket("ws://192.46.213.87:5858/api?t=xyz"); 

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
