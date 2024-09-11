import {LogLevel} from "./LogLevel";

export type LogMessage = {
  time_code: string;
  version: number;
  level: LogLevel;
  method: string;
  message: string;
  exception: string | null;
};