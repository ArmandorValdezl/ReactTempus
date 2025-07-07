import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
// createContext() crea un objeto de contexto. Cuando React renderiza un componente
// que se suscribe a este objeto, leerá el valor actual del Provider más cercano.
const TemperatureContext = createContext();

// 2. Crear un Hook personalizado para consumir el Contexto
// Esto es una buena práctica para no tener que importar `useContext` y `TemperatureContext`
// en cada componente que lo necesite. Simplemente importaremos `useTemperature`.
export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperature debe ser usado dentro de un TemperatureProvider');
  }
  return context;
};

// 3. Crear el Componente Proveedor (Provider)
// Este componente envolverá a las partes de nuestra app que necesitan acceso al estado.
export const TemperatureProvider = ({ children }) => {
  // Movemos el estado que antes estaba en App.jsx aquí.
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(prev => !prev);
  };

  // El objeto `value` contiene los datos y funciones que queremos que estén
  // disponibles para todos los componentes hijos.
  const value = {
    isCelsius,
    toggleTemperatureUnit,
  };

  return (
    <TemperatureContext.Provider value={value}>
      {children}
    </TemperatureContext.Provider>
  );
};
