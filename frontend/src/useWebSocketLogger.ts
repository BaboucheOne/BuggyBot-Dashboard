import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { LogMessage } from './LogMessage';
import { useLogContext } from './LogContext';

const useWebSocketLogger = (socketUrl: string) => {
  const { setLogs } = useLogContext();
  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    onError: (event) => console.error("WebSocket Error:", event),
  });

  useEffect(() => {
    if (lastMessage) {
      const log: LogMessage = JSON.parse(lastMessage.data);
      setLogs((prevLogs) => [...prevLogs, log]);
    }
  }, [lastMessage, setLogs]);

  return { readyState };
};

export default useWebSocketLogger;