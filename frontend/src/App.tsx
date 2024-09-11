import React from 'react';
import './App.css';
import LogTable from "./LogTable";
import LogControlPanel from "./LogControlPanel";
import WebSocketStatus from "./WebSocketStatus";
import {Box} from "@mui/material";
import useWebSocketLogger from "./useWebSocketLogger";


function App() {

  const { readyState } = useWebSocketLogger();

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
