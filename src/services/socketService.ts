// src/services/socketService.ts
// src/services/socketService.ts
import type { Store } from '@reduxjs/toolkit';
import { WebSocketClient } from './WebSocketClient';
import { setApiStatus, setStreamStatus } from '../store/slices/webSocketSlice';
import { WEBSOCKET_URL } from '../utils/constants/app.constants';

// Get URLs from .env file
const API_URL = WEBSOCKET_URL; // ws://192.46.213.87:5858/api?t=xyz
const STREAM_URL = import.meta.env.VITE_STREAM_URL; // ws://192.46.213.87:6868/stream?t=xyz

let apiClient: WebSocketClient;
let streamClient: WebSocketClient;

// This function will be called once when the app starts.
export const initializeSockets = (store: Store) => {
  if (!apiClient) {
    apiClient = new WebSocketClient(API_URL, store, setApiStatus);
    console.log("API WebSocket Client Initialized.");
  }
  
  if (!streamClient) {
    // For now, the stream client is just for demonstration. 
    // You'll add its specific onmessage logic later.
    streamClient = new WebSocketClient(STREAM_URL, store, setStreamStatus);
    console.log("Stream WebSocket Client Initialized.");
  }
};

// Export the instances to be used throughout the app
export { apiClient, streamClient };