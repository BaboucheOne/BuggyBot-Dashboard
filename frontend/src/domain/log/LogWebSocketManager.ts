export const socket = new WebSocket("ws://your-websocket-server-url");

socket.addEventListener('open', (event) => {
  console.log('WebSocket is connected.');

  // Send a message to the WebSocket server
  socket.send('Hello Server!');
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

socket.addEventListener('close', (event) => {
  console.log('WebSocket is closed now.');
});
