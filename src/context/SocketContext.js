import { useState, useRef, useEffect, createContext } from "react";
import io from "socket.io-client";
import { baseWsUrl } from "../utils/config";

export const WebsocketContext = createContext(false, null, () => {});

export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  const ws = useRef(null);

  useEffect(() => {
    // const url = "wss://echo.websocket.events/";
    const url = baseWsUrl;
    const socket = io.connect(url);

    socket.on("connect", () => {
      setIsReady(true);
    });

    socket.on("disconnect", () => {
      setIsReady(false);
    });

    socket.on("error", (err) => {
      console.log(`Error: ${err.message}`);
    });

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const ret = [isReady, ws.current];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
