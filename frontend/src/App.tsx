import React, {useState} from 'react';
import './App.css';
import LogTable from "./component/log/LogTable";
import LogControlPanel from "./component/log/LogControlPanel";
import WebSocketStatus from "./component/WebSocketStatus";
import {Box} from "@mui/material";
import useWebSocketLogger from "./domain/log/useWebSocketLogger";
import LoginModal from "./component/log/LoginModal";
import {useAuthContext} from "./context/AuthContext";


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
