
import { createRoot } from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import './index.css'
import App from './App.jsx'
import { lmsAuthapi } from './services/api.js';

createRoot(document.getElementById('root')).render(
  <ApiProvider api={lmsAuthapi} >
    <App />
  </ApiProvider>
)
