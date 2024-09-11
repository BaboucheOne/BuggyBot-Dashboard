import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BugReportIcon from '@mui/icons-material/BugReport';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';

type LogLevel = 'INFO' | 'WARNING' | 'DEBUG' | 'ERROR' | 'FATAL';

const levelProperties: Record<LogLevel, { icon: React.ReactElement; color: string }> = {
  INFO: { icon: <InfoIcon />, color: '#43a8ec' },
  DEBUG: { icon: <BugReportIcon />, color: 'green' },
  WARNING: { icon: <WarningIcon />, color: '#ee9801' },
  ERROR: { icon: <ErrorIcon />, color: '#e93861' },
  FATAL: { icon: <ReportIcon />, color: '#9c2541' },
};

const logData: { level: LogLevel; version: string; time: string; method: string; message: string; exception: string }[] = [
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
  { level: 'INFO', version: '1.0', time: '2024-09-10 14:32', method: 'GET', message: 'App started', exception: '' },
  { level: 'WARNING', version: '1.0', time: '2024-09-10 15:01', method: 'POST', message: 'Slow response', exception: '' },
  { level: 'DEBUG', version: '1.1', time: '2024-09-10 15:30', method: 'PATCH', message: 'Debugging flow', exception: '' },
  { level: 'ERROR', version: '1.2', time: '2024-09-10 16:00', method: 'DELETE', message: 'Null pointer exception', exception: 'NullPointerException' },
  { level: 'FATAL', version: '1.3', time: '2024-09-10 16:20', method: 'PUT', message: 'System crash', exception: 'SystemException' },
];

const LogTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ padding: '2px 8px', width: '5%' }}></TableCell>
            <TableCell align="left" style={{ padding: '2px 8px', width: '5%' }}>Level</TableCell>
            <TableCell align="left" style={{ padding: '2px 8px', width: '5%' }}>Version</TableCell>
            <TableCell align="left" style={{ padding: '2px 8px', width: '10%' }}>Time</TableCell>
            <TableCell align="left" style={{ padding: '2px 8px' }}>Method</TableCell>
            <TableCell align="left" style={{ padding: '2px 8px' }}>Message</TableCell>
            <TableCell align="left" style={{ padding: '2px 8px', whiteSpace: 'nowrap', width: '10%' }}>Exception</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logData.map((log, index) => (
            <TableRow key={index}>
              <TableCell>
                  <Box mr={1} style={{ color: levelProperties[log.level].color }}>{levelProperties[log.level].icon}</Box>
              </TableCell>
              <TableCell>
                  <Typography style={{ color: levelProperties[log.level].color }}>{log.level}</Typography>
              </TableCell>
              <TableCell>{log.version}</TableCell>
              <TableCell>{log.time}</TableCell>
              <TableCell sx={{ color: '#5c5b5b'}}>{log.method}</TableCell>
              <TableCell sx={{ color: '#5c5b5b'}}>{log.message}</TableCell>
              <TableCell sx={{ color: '#5c5b5b'}}>{log.exception}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogTable;
