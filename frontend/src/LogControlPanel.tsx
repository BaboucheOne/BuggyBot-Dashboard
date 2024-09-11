import React from 'react';
import { Box } from '@mui/material';
import LogButton from "./LogButton";
import {LogLevel} from "./LogLevel";
import {useLogContext} from "./LogContext";

const LogControlPanel: React.FC = () => {

  const {logs, selectedLevels, setSelectedLevels} = useLogContext();

  const logCounts = logs.reduce((acc, log) => {
    if (acc[log.level] === undefined) {
      acc[log.level] = 0;
    }
    acc[log.level] += 1;
    return acc;
  }, {} as Record<LogLevel, number>);

  const handleLevelChange = (level: LogLevel) => {
    setSelectedLevels((prevLevels: Set<LogLevel> ) => {
      const updatedLevels = new Set(prevLevels);
      if (updatedLevels.has(level)) {
        updatedLevels.delete(level);
      } else {
        updatedLevels.add(level);
      }
      return updatedLevels;
    });
  };

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
      {['INFO', 'DEBUG', 'WARNING', 'ERROR', 'FATAL'].map(level => (
        <LogButton
          key={level}
          level={level as LogLevel}
          logCount={logCounts[level as LogLevel] || 0}
          onChange={() => handleLevelChange(level as LogLevel)}
          checked={selectedLevels.has(level as LogLevel)}
        />
      ))}
    </Box>
  );
};

export default LogControlPanel;
