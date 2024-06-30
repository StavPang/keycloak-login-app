import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import your global styles if any
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure you have a root element in your public/index.html file
);

// If you want to measure performance or send usage statistics, you can uncomment the following line
// Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
