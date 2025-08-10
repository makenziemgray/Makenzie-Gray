/*
React Portfolio App
Plain CSS + Functional Components
Pages: Home, Projects, Contact
*/

// Project Structure:
// src/
// ├── App.jsx
// ├── index.js
// ├── styles/
// │   └── global.css
// ├── components/
// │   ├── Hero.jsx
// │   ├── Projects.jsx
// │   └── Contact.jsx
// └── App.css

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

