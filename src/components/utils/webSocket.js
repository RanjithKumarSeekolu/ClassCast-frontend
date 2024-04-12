import { useEffect, useState, useRef, useCallback } from "react";

const useWebSocket = (url, onMessage, autoConnect = true) => {
  const socket = useRef(null);
  const [status, setStatus] = useState("disconnected");

  const sendMessage = useCallback((message) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    if (!autoConnect) return; // Only connect if autoConnect is true

    socket.current = new WebSocket(url);
    socket.current.onopen = () => {
      console.log("WebSocket Connected");
      setStatus("connected");
    };
    socket.current.onclose = () => {
      console.log("WebSocket Disconnected");
      setStatus("disconnected");
    };
    socket.current.onerror = (error) => {
      console.log("WebSocket Error:", error);
      setStatus("error");
    };
    socket.current.onmessage = (event) => onMessage && onMessage(event.data);

    // Cleanup on dismount
    return () => {
      socket.current.close();
    };
  }, [url, onMessage, autoConnect]);

  return { sendMessage, status };
};

export default useWebSocket;
