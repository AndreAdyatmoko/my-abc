import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import "./index.css";
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
