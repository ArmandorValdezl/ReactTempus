import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import { kelvinToCelsius, kelvinToFahrenheit } from '../utils/helpers';
import { useTemperature } from '../context/TemperatureContext';

const getDayName = (dateString) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const date = new Date(dateString.replace(' ', 'T') + 'Z');
  return days[date.getUTCDay()];
};

export const Forecast = ({ forecastData }) => {
  const { isCelsius } = useTemperature();

  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mt-6 bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-lg p-4">
      <h3 className="text-md font-semibold mb-2 text-center text-white/80 tracking-wide">Pronóstico</h3>
      {/* 1. Envolvemos el contenido deslizable en un div que ocultará el desbordamiento */}
      <div className="overflow-hidden">
        {/* 2. Aplicamos un padding inferior y un margen negativo para empujar la barra de scroll fuera de la vista */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mb-4 md:justify-around md:gap-0 md:pb-2 md:mb-0">
          {forecastData.map((day) => (
            <div 
              key={day.dt} 
              className="flex flex-col items-center p-2 rounded-lg flex-shrink-0"
            >
              <p className="font-semibold text-md">{getDayName(day.dt_txt)}</p>
              <WeatherIcon 
                iconCode={day.weather[0].icon} 
                className="w-14 h-14 my-1 text-yellow-300" 
              />
              <div className="text-sm text-center">
                <span className="font-bold">{isCelsius ? kelvinToCelsius(day.main.temp_max) : kelvinToFahrenheit(day.main.temp_max)}°</span>
                <span className="text-white/70 ml-1">{isCelsius ? kelvinToCelsius(day.main.temp_min) : kelvinToFahrenheit(day.main.temp_min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
