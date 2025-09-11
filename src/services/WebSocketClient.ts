// src/services/WebSocketClient.ts

// FIX: Use 'import type' for the Store type.
import type { Store } from '@reduxjs/toolkit';

// This import is now used correctly.
// import { setApiStatus, setStreamStatus } from '../store/slices/webSocketSlice';

export type WebSocketStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

// FIX: Define a generic response payload to avoid using 'any'
interface ResponsePayload<T = unknown> {
  data?: T;
  message: string;
  status: 'success' | 'failed';
}

interface PendingRequest<T> {
  // FIX: Make the resolve function type-safe
  resolve: (value: ResponsePayload<T>) => void;
  reject: (reason?: ResponsePayload<T>) => void;
  // FIX: Use ReturnType<typeof setTimeout> which works in all environments (browser/node)
  timer: ReturnType<typeof setTimeout>;
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  // FIX: Make the Map type-safe with <unknown> to handle various response types.
  private pendingRequests = new Map<string, PendingRequest<unknown>>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectInterval = 3000;
  private status: WebSocketStatus = 'disconnected';
  private store: Store;
  private statusUpdater: (status: WebSocketStatus) => { type: string; payload: WebSocketStatus };

  constructor(
    url: string,
    store: Store,
    statusUpdater: (status: WebSocketStatus) => { type: string; payload: WebSocketStatus }
  ) {
    this.url = url;
    this.store = store;
    this.statusUpdater = statusUpdater;
    this.connect();
  }

  // ... (setStatus, connect methods are the same as before)
  private setStatus(newStatus: WebSocketStatus) {
    if (this.status === newStatus) return;
    this.status = newStatus;
    console.log(`[WebSocket] Status for ${this.url}: ${newStatus.toUpperCase()}`);
    this.store.dispatch(this.statusUpdater(newStatus));
  }
  
  public connect() {
    this.setStatus('connecting');
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      console.warn("[WebSocket] Already connected or connecting.");
      return;
    }
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.setStatus('connected');
      this.reconnectAttempts = 0;
    };
    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data);

        // ✅ Log the raw response from the server
    console.log("📨 Received WebSocket message:", msg);
    
        if (msg.rid && this.pendingRequests.has(msg.rid)) {
          const pending = this.pendingRequests.get(msg.rid)!;
          clearTimeout(pending.timer);
          if (msg.payload?.status === 'failed') {
            pending.reject(msg.payload);
          } else {
            pending.resolve(msg.payload);
          }
          this.pendingRequests.delete(msg.rid);
        } else {
          console.log("📩 Unsolicited message received:", msg);
        }
      } catch (err) {
        console.error("⚠️ Invalid WS message received:", event.data, err);
      }
    };
    this.ws.onclose = () => {
      this.setStatus('disconnected');
      this.pendingRequests.forEach((pending, rid) => {
        clearTimeout(pending.timer);
        pending.reject({ status: 'failed', message: "WebSocket closed before response was received." });
        this.pendingRequests.delete(rid);
      });
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        this.setStatus('reconnecting');
        setTimeout(() => this.connect(), this.reconnectInterval);
      } else {
        console.error(`[WebSocket] Max reconnect attempts reached for ${this.url}.`);
      }
    };
    this.ws.onerror = (err) => {
      console.error(`⚠️ WebSocket error for ${this.url}:`, err);
      this.ws?.close();
    };
  }

  /**
   * Sends a message and returns a Promise that resolves with the response.
   * @param target The API endpoint/target.
   * @param payload The data to send.
   * @param timeout Timeout in seconds.
   */
  public send<T>(target: string, payload: object, timeout = 15): Promise<ResponsePayload<T>> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        return reject({ message: "WebSocket is not connected.", status: "failed" });
      }
      const rid = crypto.randomUUID();
      const session = new URL(this.url).searchParams.get("t") || "xyz";
      const message = { rid, target, session, payload };

      // Log the complete message before sending it
    // console.log("📤 Sending WebSocket message:", JSON.stringify(message, null, 2));

    console.log("📤 Sending WebSocket message:", message);

      const timer = setTimeout(() => {
        if (this.pendingRequests.has(rid)) {
          this.pendingRequests.delete(rid);
          reject({ message: `Request timed out after ${timeout} seconds.`, status: "failed" });
        }
      }, timeout * 1000);
      this.pendingRequests.set(rid, { resolve, reject, timer } as PendingRequest<unknown>);
      this.ws.send(JSON.stringify(message));
    });
  }
}