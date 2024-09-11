import React from "react";
import {Box, Checkbox, Typography} from "@mui/material";
import {LogLevel} from "./LogLevel";
import {logLevelColors} from "./LogLevelColors";


const capitalizeFirstLetter = (logLevel: LogLevel): string => {
  return logLevel.charAt(0) + logLevel.slice(1).toLowerCase();
};

const LogButton: React.FC<{ level: LogLevel }> = ({ level }) => {
  const color = logLevelColors[level];
  const logLevelText = capitalizeFirstLetter(level)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'justify-content',
        padding: '8px',
        backgroundColor: color,
        borderRadius: '4px',
        color: 'white',
        marginRight: '4px',
        height: '16px',
        minWidth: '125px',
      }}
    >
      <Checkbox sx={{ color: '#FFFFFF', padding: 0, '&.Mui-checked': {
          color: '#FFFFFF',
        }, }} />
      <Typography align="left" sx={{ paddingLeft: '4px' }}>{logLevelText}: </Typography>
      <Typography align="left" sx={{fontWeight: 'bold'}}>234,430</Typography>
    </Box>
  );
};

export default LogButton;