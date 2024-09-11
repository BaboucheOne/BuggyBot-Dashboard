import React from 'react';
import { Box } from '@mui/material';
import LogButton from "./LogButton";

const LogControlPanel: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        height: '16px',
        width: '100%',
      }}
    >
      <LogButton level="INFO" />
      <LogButton level="DEBUG" />
      <LogButton level="WARNING" />
      <LogButton level="ERROR" />
      <LogButton level="FATAL" />
    </Box>
  );
};

export default LogControlPanel;
