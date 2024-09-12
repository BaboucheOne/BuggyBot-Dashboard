import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import {LogLevel} from "../../domain/log/LogLevel";

const logLevelColors: Record<LogLevel, string> = {
  INFO: '#43a8ec',
  DEBUG: 'green',
  WARNING: '#ee9801',
  ERROR: '#e93861',
  FATAL: '#9c2541',
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const LogButton: React.FC<{ level: LogLevel, logCount: number, onChange: () => void, checked: boolean }> = ({ level, logCount, onChange, checked }) => {
  const color = logLevelColors[level];
  const logLevelText = capitalizeFirstLetter(level);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '8px',
        backgroundColor: color,
        borderRadius: '4px',
        color: 'white',
        marginRight: '4px',
        height: '24px',
        minWidth: '150px',
      }}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        sx={{
          color: '#FFFFFF',
          padding: 0,
          '&.Mui-checked': {
            color: '#FFFFFF',
          },
        }}
      />
      <Typography align="left" sx={{ paddingLeft: '4px' }}>{logLevelText}: </Typography>
      <Typography align="left" sx={{ fontWeight: 'bold' }}>{Intl.NumberFormat().format(logCount)}</Typography>
    </Box>
  );
};

export default LogButton;
