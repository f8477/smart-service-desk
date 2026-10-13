import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Phase 0 entry point. No routing, state, or API calls yet.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
