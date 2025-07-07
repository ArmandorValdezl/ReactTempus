import React from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

export const ErrorDisplay = ({ message, onRetry }) => {
  return (
    // Glasmorfismo con tinte rojo para errores
    <div 
      className="w-full text-center bg-red-500/20 border border-red-400/50 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg"
      role="alert"
    >
      <AlertTriangle size={40} className="mx-auto mb-3 text-yellow-400" />
      <h2 className="text-xl font-bold mb-1">¡Ups! Ocurrió un error</h2>
      <p className="mb-4 text-white/80">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 mx-auto bg-yellow-400/80 hover:bg-yellow-400 text-black font-bold py-2 px-5 rounded-full transition-all transform hover:scale-105"
        >
          <RotateCw size={16} />
          Intentar de nuevo
        </button>
      )}
    </div>
  );
};
