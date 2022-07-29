import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit&nbsp;
          <code>src/App.tsx</code>
          &nbsp;and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          style={{ width: '100px', height: '50px', fontSize: '24px' }}
          type="button"
          onClick={() => setState(state + 1)}
        >
          {state}
        </button>
      </header>
    </div>
  );
}

export default App;
