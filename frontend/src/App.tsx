import React, {useState} from 'react';
import './App.css';
import LogTable from "./LogTable";
import LogControlPanel from "./LogControlPanel";
import WebSocketStatus from "./WebSocketStatus";
import {Box} from "@mui/material";
import useWebSocketLogger from "./useWebSocketLogger";
import LoginModal from "./LoginModal";
import {useAuthContext} from "./AuthContext";


function App() {

  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setModalOpen] = useState(!isLoggedIn);
  const { readyState } = useWebSocketLogger();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App" style={{ backgroundColor: '#f5f5f5' }}>
      <LoginModal open={isModalOpen} onClose={handleCloseModal} />
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <LogControlPanel/>
          <WebSocketStatus readyState={readyState}/>
        </Box>
        <LogTable/>
    </div>
  );
}

export default App;
