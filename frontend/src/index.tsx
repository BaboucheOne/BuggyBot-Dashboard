import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {LogProvider} from "./LogContext";
import {AuthProvider} from "./AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LogProvider>
        <App />
      </LogProvider>
    </AuthProvider>
  </React.StrictMode>
);
