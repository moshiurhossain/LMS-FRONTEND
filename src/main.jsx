
import { createRoot } from 'react-dom/client'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import './index.css'
import App from './App.jsx'
import { lmsapi } from './service/api.js';

createRoot(document.getElementById('root')).render(
  <ApiProvider api={lmsapi}>
    <App />
  </ApiProvider>
)
