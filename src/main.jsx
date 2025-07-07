import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// 1. Importamos nuestro nuevo Proveedor
import { TemperatureProvider } from './context/TemperatureContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolvemos el componente App con el Proveedor */}
    <TemperatureProvider>
      <App />
    </TemperatureProvider>
  </React.StrictMode>,
);
