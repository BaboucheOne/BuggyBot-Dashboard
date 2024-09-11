import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { LogMessage } from './LogMessage';
import { useLogContext } from './LogContext';
import getLogs from "./useRequestLogs";

const useWebSocketLogger = (socketUrl: string) => {
  const { setLogs } = useLogContext();
  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    onError: (event) => console.error("WebSocket Error:", event),
    onOpen: async event => {
      const logs = await getLogs("http://127.0.0.1:8080/log");
      setLogs((prevLogs) => logs);
    }
  });

  useEffect(() => {
    if (lastMessage) {
      const log: LogMessage = JSON.parse(lastMessage.data);
      setLogs((prevLogs) => [...prevLogs, log]);
    }
  }, [lastMessage]);

  return { readyState };
};

export default useWebSocketLogger;