import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import BugReportIcon from '@mui/icons-material/BugReport';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import {LogLevel} from "./LogLevel";
import {LogMessage} from "./LogMessage";


const levelProperties: Record<LogLevel, { icon: React.ReactElement; color: string }> = {
  INFO: { icon: <InfoIcon />, color: '#43a8ec' },
  DEBUG: { icon: <BugReportIcon />, color: 'green' },
  WARNING: { icon: <WarningIcon />, color: '#ee9801' },
  ERROR: { icon: <ErrorIcon />, color: '#e93861' },
  FATAL: { icon: <ReportIcon />, color: '#9c2541' },
};

interface LogTableProps {
  logs: LogMessage[];
}

const LogTable:React.FC<LogTableProps> = ({ logs }) => {
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
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>
                  <Box mr={1} style={{ color: levelProperties[log.level].color }}>{levelProperties[log.level].icon}</Box>
              </TableCell>
              <TableCell>
                  <Typography style={{ color: levelProperties[log.level].color }}>{log.level}</Typography>
              </TableCell>
              <TableCell>{log.version}</TableCell>
              <TableCell>{log.time_code}</TableCell>
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
