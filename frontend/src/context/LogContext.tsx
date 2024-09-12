import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LogMessage } from '../domain/log/LogMessage';
import {LogLevel} from "../domain/log/LogLevel";

interface LogContextProps {
  logs: LogMessage[];
  filteredLogs: LogMessage[];
  setLogs: (logs: (prevLogs: LogMessage[]) => (LogMessage)[]) => void;
  selectedLevels: Set<LogLevel>;
  setSelectedLevels: (levels: Set<LogLevel> | ((prevLevels: Set<LogLevel>) => Set<LogLevel>)) => void;
}

const LogContext = createContext<LogContextProps | undefined>(undefined);

export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Set<LogLevel>>(
    new Set<LogLevel>(['INFO', 'DEBUG', 'WARNING', 'ERROR', 'FATAL'])
  );

  const filteredLogs = logs.filter(log => selectedLevels.has(log.level));

  return (
    <LogContext.Provider value={{ logs, filteredLogs, setLogs, selectedLevels, setSelectedLevels }}>
  {children}
  </LogContext.Provider>
);
};

export const useLogContext = (): LogContextProps => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLogContext must be used within a LogProvider');
  }
  return context;
};
