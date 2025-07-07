import React from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard';
import { ErrorDisplay } from './components/ErrorDisplay';
import { CitySearch } from './components/CitySearch';
import { Forecast } from './components/Forecast';
import { VideoBackground } from './components/VideoBackground';
import { 
  kelvinToCelsius, 
  kelvinToFahrenheit
} from './utils/helpers';

export default function App() {
  const { weatherData, forecastData, loading, error, fetchWeatherByCity, fetchWeatherByLocation } = useWeather();

  const renderContent = () => {
    if (loading && !weatherData) {
      return (
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400 mx-auto"></div>
          <p className="mt-4 text-lg">Obteniendo tu ubicación...</p>
        </div>
      );
    }
  
    if (error && !weatherData) {
      return <ErrorDisplay message={error} onRetry={fetchWeatherByLocation} />;
    }
  
    if (weatherData) {
      return (
        <>
          <WeatherCard 
            weatherData={weatherData}
            kelvinToCelsius={kelvinToCelsius}
            kelvinToFahrenheit={kelvinToFahrenheit}
          />
          <Forecast 
            forecastData={forecastData}
          />
        </>
      );
    }

    return null;
  };

  return (
    // El div principal ya no necesita ser 'relative'.
    <div className="min-h-screen w-full font-sans text-white">
      <VideoBackground weatherCondition={weatherData?.weather[0]?.main} />
      
      {/* El 'main' sigue siendo el overlay semitransparente sobre el video. */}
      <main className="relative z-10 flex flex-col items-center w-full min-h-screen bg-black/30 p-4 md:p-8">
        
        <CitySearch 
          onSearch={fetchWeatherByCity} 
          onLocationClick={fetchWeatherByLocation}
          loading={loading} 
        />

        {error && weatherData && 
          <div className="w-full max-w-md mb-4">
            <ErrorDisplay message={error} />
          </div>
        }

        {renderContent()}
      </main>
    </div>
  );
}
