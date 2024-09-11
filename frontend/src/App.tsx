import React from 'react';
import './App.css';
import LogTable from "./LogTable";
import LogControlPanel from "./LogControlPanel";
import WebSocketStatus from "./WebSocketStatus";
import {Box} from "@mui/material";
import useWebSocketLogger from "./useWebSocketLogger";
import getLogs from "./useRequestLogs";


function App() {
  const socketUrl = "ws://127.0.0.1:8080/log";
  const logUrl = "http://127.0.0.1:8080/log";

  const { readyState } = useWebSocketLogger(socketUrl);

  return (
    <div className="App" style={{ backgroundColor: '#f5f5f5' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <LogControlPanel/>
          <WebSocketStatus readyState={readyState}/>
        </Box>
        <LogTable/>
    </div>
  );
}

export default App;
