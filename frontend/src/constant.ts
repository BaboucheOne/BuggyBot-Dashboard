export const SERVER_ADDRESS: string = "127.0.0.1";
export const SERVER_PORT: number = 8080;
export const GET_LOG_ENDPOINT: string = "log";
export const WEBSOCKET_LOG_ENDPOINT: string = "log";


export const WEBSOCKET_LOG_URL: string = `http://${SERVER_ADDRESS}:${SERVER_PORT}/${WEBSOCKET_LOG_ENDPOINT}`;
export const GET_LOG_URL: string = `http://${SERVER_ADDRESS}:${SERVER_PORT}/${GET_LOG_ENDPOINT}`;

export const NUMBER_OF_LOG_TO_REQUEST: number = 500;