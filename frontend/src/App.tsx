import React, {useEffect, useState} from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';
import LogTable from "./LogTable";
import LogControlPanel from "./LogControlPanel";
import WebSocketStatus from "./WebSocketStatus";
import {Box} from "@mui/material";
import {LogMessage} from "./LogMessage";

function App() {

  const socketUrl: string = "ws://127.0.0.1:8080/log";
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    onError: (event) => {
      console.error("WebSocket Error:", event);
    },
  });

  useEffect(() => {
    if(lastMessage !== null) {
      const log: LogMessage  = JSON.parse(lastMessage.data);
      setLogs(prevLogs => [...prevLogs, log]);
    }
  }, [lastMessage]);

  return (
    <div className="App" style={{ backgroundColor: '#f5f5f5' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <LogControlPanel/>
        <WebSocketStatus readyState={readyState}/>
      </Box>
      <LogTable logs={logs}/>
    </div>
  );
}

export default App;
