import React from 'react';
import './App.css';
import LogTable from "./LogTable";
import LogControlPanel from "./LogControlPanel";

function App() {
  return (
    <div className="App">
      <LogControlPanel/>
      <LogTable/>
    </div>
  );
}

export default App;
