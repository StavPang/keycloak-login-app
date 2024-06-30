import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <h1>Keycloak Login and Register</h1>
      <Login />
      <hr />
      <Register />
    </div>
  );
}

export default App;
