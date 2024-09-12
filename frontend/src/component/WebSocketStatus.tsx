import React from 'react';
import { ReadyState } from 'react-use-websocket';
import { Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface WebSocketStatusProps {
  readyState: ReadyState;
}

const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ readyState }) => {
  return (
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", p:2, height: '16px'}}>
      {readyState === ReadyState.OPEN ? (
        <Box display="flex" alignItems="center">
          <CheckCircleIcon color="success" />
          <Typography variant="h6" color="success.main" ml={1}>
            Connected
          </Typography>
        </Box>
      ) : readyState === ReadyState.CONNECTING ? (
        <Box display="flex" alignItems="center">
          <CircularProgress size={20} sx={{ color: '#ee9801' }} />
          <Typography variant="h6" color="#ee9801" ml={1}>
            Connecting
          </Typography>
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          <ErrorIcon color="error" />
          <Typography variant="h6" color="error.main" ml={1}>
            Disconnected
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WebSocketStatus;
