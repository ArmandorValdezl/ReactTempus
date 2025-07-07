import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export const CitySearch = ({ onSearch, onLocationClick, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    // Se ajusta el margen inferior para dar más espacio
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
      <div className="relative flex items-center gap-2">
        <div className="relative w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Buscar ciudad..."
            disabled={loading}
            // Estilo de Glasmorfismo mejorado: más blur, borde sutil.
            className="w-full py-3 pl-5 pr-12 text-lg text-white bg-white/10 border border-white/20 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/70 hover:text-white disabled:text-gray-500 transition-colors"
            disabled={loading}
            aria-label="Buscar"
          >
            <Search size={22} />
          </button>
        </div>
        
        <button
          type="button"
          onClick={onLocationClick}
          disabled={loading}
          // Estilo consistente con el input
          className="p-3 bg-white/10 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/20 disabled:text-gray-500 transition-all duration-300"
          aria-label="Usar mi ubicación actual"
        >
          <MapPin size={22} />
        </button>
      </div>
    </form>
  );
};
