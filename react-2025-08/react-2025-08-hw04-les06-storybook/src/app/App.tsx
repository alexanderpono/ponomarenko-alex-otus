import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'src/shared/Modal/Modal';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Текст писать тут
        </p>
        <Modal visible={true} />
      </header>
    </div>
  );
}

export default App;
