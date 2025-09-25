
import React from 'react';
import './app/styles/global.css';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register PWA only in local development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = '/pwa-register.js';
  document.body.appendChild(script);
}
