import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { LogMessage } from './LogMessage';
import { useLogContext } from './LogContext';
import getLogsRequest from "./getLogsRequest";
import {COOKIES_TOKEN_KEY, WEBSOCKET_LOG_URL} from "./constant";
import Cookies from "js-cookie";
import {useAuthContext} from "./AuthContext";
import {socket} from "./LogWebSocketManager";

const useWebSocketLogger = () => {
  const { setLogs } = useLogContext();
  const { isLoggedIn } = useAuthContext();

  const { lastMessage, readyState } = useWebSocket(`${WEBSOCKET_LOG_URL}?token=${Cookies.get(COOKIES_TOKEN_KEY)}`, {
    shouldReconnect: () => isLoggedIn,
    onError: (event) => console.error("WebSocket Error:", event),
    onOpen: async event => {
      if(!isLoggedIn) {
        return;
      }

      const logs = await getLogsRequest();
      if(logs) {
        setLogs((prevLogs) => logs);
      }
    }
  });

  useEffect(() => {
    if (lastMessage && isLoggedIn) {
      const log: LogMessage = JSON.parse(lastMessage.data);
      setLogs((prevLogs) => [...prevLogs, log]);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!isLoggedIn) {
      socket.close();
    }
  }, [isLoggedIn]);

  return { readyState };
};

export default useWebSocketLogger;