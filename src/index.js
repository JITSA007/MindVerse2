import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Explicitly using .jsx to fix the "Module not found" error

/**
 * ENTRY POINT: src/index.js
 * This is the first file the computer reads. 
 * We have updated the import to specifically look for 'App.jsx'.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);