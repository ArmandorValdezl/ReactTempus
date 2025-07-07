import React from 'react';
import { iconsMap } from '../utils/icons';

// Este componente recibe un código de icono de la API y renderiza el SVG correspondiente.
export const WeatherIcon = ({ iconCode, className }) => {
  // Busca la ruta del SVG en el mapa. Si no la encuentra, usa 'soleado' como defecto.
  const pathData = iconsMap[iconCode] || iconsMap['01d'];

  return (
    <svg 
      viewBox="0 0 38 38"
      fill="currentColor"
      className={className}
      aria-label="weather icon"
    >
      <path d={pathData}></path>
    </svg>
  );
};
