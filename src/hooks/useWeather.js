import { useState, useEffect, useCallback } from 'react';

// Centralizamos la configuración de la API para fácil mantenimiento
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// --- Función para procesar los datos del pronóstico ---
const processForecastData = (list) => {
  const dailyData = [];
  const seenDays = new Set();

  for (const item of list) {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!seenDays.has(date)) {
      seenDays.add(date);
      dailyData.push(item);
    }
  }
  return dailyData.slice(1, 6);
};

// --- Hook `useWeather` ---
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllWeatherData = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    if (!API_KEY) {
      setError("La clave de la API de OpenWeatherMap no está configurada.");
      setLoading(false);
      return;
    }

    const weatherUrl = `${API_BASE_URL}/weather?${params}&appid=${API_KEY}&lang=es`;
    const forecastUrl = `${API_BASE_URL}/forecast?${params}&appid=${API_KEY}&lang=es`;

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        if (weatherResponse.status === 404 || forecastResponse.status === 404) {
          throw new Error('Ciudad no encontrada. Por favor, verifica el nombre.');
        }
        throw new Error('Respuesta no válida del servidor del clima.');
      }

      const weatherJson = await weatherResponse.json();
      const forecastJson = await forecastResponse.json();
      
      setWeatherData(weatherJson);
      setForecastData(processForecastData(forecastJson.list));

    } catch (err) {
      setError(err.message || 'No se pudieron obtener los datos del clima.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback((city) => {
    fetchAllWeatherData(`q=${city}`);
  }, [fetchAllWeatherData]);

  const fetchWeatherByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es soportada por tu navegador.");
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchAllWeatherData(`lat=${latitude}&lon=${longitude}`);
      },
      (err) => {
        setError('Acceso a la ubicación denegado. Puedes buscar una ciudad manualmente.');
        setLoading(false);
        console.error("Error de Geolocalización:", err);
      }
    );
  }, [fetchAllWeatherData]);

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return { 
    weatherData, 
    forecastData,
    loading, 
    error, 
    fetchWeatherByCity, 
    fetchWeatherByLocation 
  };
};
