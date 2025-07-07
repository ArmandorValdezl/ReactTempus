import React from 'react';
// 1. Importamos el nuevo icono 'Eye' para la visibilidad
import { Cloud, Wind, Droplets, Gauge, MapPin, Sunrise, Sunset, ArrowUp, ArrowDown, Eye, Thermometer } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { useTemperature } from '../context/TemperatureContext';
import { formatTime } from '../utils/helpers';

export const WeatherCard = ({ 
  weatherData, 
  kelvinToCelsius, 
  kelvinToFahrenheit 
}) => {
  const { isCelsius, toggleTemperatureUnit } = useTemperature();

  return (
    <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-lg p-6">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-white/80" />
          <h1 className="text-2xl font-bold tracking-wide">{weatherData.name}, {weatherData.sys.country}</h1>
        </div>
        <button 
          onClick={toggleTemperatureUnit} 
          className="text-lg font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-colors px-4 py-1 rounded-full"
        >
          °{isCelsius ? 'F' : 'C'}
        </button>
      </div>

      <div className="text-center my-2">
        <WeatherIcon 
          iconCode={weatherData.weather[0].icon} 
          className="w-36 h-36 mx-auto text-yellow-300 drop-shadow-lg"
        />
        <p className="text-8xl font-thin tracking-tighter -mt-6">
          {isCelsius
            ? kelvinToCelsius(weatherData.main.temp)
            : kelvinToFahrenheit(weatherData.main.temp)}°
        </p>
        <p className="text-xl capitalize text-white/90">{weatherData.weather[0].description}</p>
        
        <div className="flex justify-center gap-4 text-md text-white/80 mt-2">
          <div className="flex items-center gap-1">
            <ArrowUp size={18} />
            <span>Máx: {isCelsius ? kelvinToCelsius(weatherData.main.temp_max) : kelvinToFahrenheit(weatherData.main.temp_max)}°</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDown size={18} />
            <span>Mín: {isCelsius ? kelvinToCelsius(weatherData.main.temp_min) : kelvinToFahrenheit(weatherData.main.temp_min)}°</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 my-4"></div>

      {/* 2. Reorganizamos la cuadrícula para incluir todos los datos solicitados */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Thermometer size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Sensación</p>
            <p className="text-white/80">{isCelsius ? kelvinToCelsius(weatherData.main.feels_like) : kelvinToFahrenheit(weatherData.main.feels_like)}°</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Humedad</p>
            <p className="text-white/80">{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Viento</p>
            <p className="text-white/80">{weatherData.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Gauge size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Presión</p>
            <p className="text-white/80">{weatherData.main.pressure} hPa</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Nubes</p>
            <p className="text-white/80">{weatherData.clouds.all}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Visibilidad</p>
            {/* La visibilidad viene en metros, la convertimos a km */}
            <p className="text-white/80">{(weatherData.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sunrise size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Amanecer</p>
            <p className="text-white/80">{formatTime(weatherData.sys.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sunset size={20} className="text-white/80" />
          <div>
            <p className="font-semibold">Atardecer</p>
            <p className="text-white/80">{formatTime(weatherData.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
