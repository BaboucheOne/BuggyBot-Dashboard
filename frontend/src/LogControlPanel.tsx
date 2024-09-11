import React from 'react';
import { Box, Checkbox, Typography, TextField } from '@mui/material';

type LogLevel = 'INFO' | 'WARNING' | 'DEBUG' | 'ERROR' | 'FATAL';

const logLevelColors = {
  INFO: 'black',
  WARNING: 'orange',
  DEBUG: 'blue',
  ERROR: 'red',
  FATAL: 'darkred',
};

const LogButton: React.FC<{ level: LogLevel }> = ({ level }) => {
  const color = logLevelColors[level];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        backgroundColor: color,
        borderRadius: '4px',
        color: 'white',
        marginRight: '4px',
        height: '16px',
        minWidth: '150px',
      }}
    >
      <Checkbox sx={{ color: 'white', padding: 0 }} />
      <Typography sx={{ paddingLeft: '4px' }}>{level}: </Typography>
      <Typography>234,430</Typography>
    </Box>
  );
};

const LogControlPanel: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        height: '16px',
        width: '100%',
      }}
    >
      <LogButton level="INFO" />
      <LogButton level="WARNING" />
      <LogButton level="DEBUG" />
      <LogButton level="ERROR" />
      <LogButton level="FATAL" />
    </Box>
  );
};

export default LogControlPanel;
