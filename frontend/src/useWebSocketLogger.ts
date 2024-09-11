import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { LogMessage } from './LogMessage';
import { useLogContext } from './LogContext';
import getLogs from "./useRequestLogs";
import {WEBSOCKET_LOG_URL} from "./constant";

const useWebSocketLogger = () => {
  const { setLogs } = useLogContext();
  const { lastMessage, readyState } = useWebSocket(WEBSOCKET_LOG_URL, {
    shouldReconnect: () => true,
    onError: (event) => console.error("WebSocket Error:", event),
    onOpen: async event => {
      const logs = await getLogs();
      if(logs) {
        setLogs((prevLogs) => logs);
      }
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