// --- Archivo de Funciones de Ayuda (Utilidades) ---
// Este archivo contiene funciones puras y reutilizables que no dependen
// del estado de React ni de los componentes.

// Convierte Kelvin (unidad por defecto de la API) a Celsius.
export const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

// Convierte Kelvin a Fahrenheit.
export const kelvinToFahrenheit = (k) => ((k - 273.15) * 9/5 + 32).toFixed(1);

// Devuelve una clase de CSS para el fondo según la condición climática.
export const getBackgroundClass = (weather) => {
  if (!weather) return 'from-gray-400 to-gray-600'; // Fondo por defecto

  const main = weather.toLowerCase();
  if (main.includes('clear')) return 'from-blue-400 to-blue-600'; // Despejado
  if (main.includes('clouds')) return 'from-slate-500 to-slate-700'; // Nublado
  if (main.includes('rain') || main.includes('drizzle')) return 'from-gray-600 to-gray-800'; // Lluvia
  if (main.includes('thunderstorm')) return 'from-indigo-800 to-gray-900'; // Tormenta
  if (main.includes('snow')) return 'from-blue-200 to-blue-400'; // Nieve
  if (main.includes('mist') || main.includes('fog')) return 'from-gray-300 to-gray-500'; // Niebla
  
  return 'from-gray-400 to-gray-600'; // Un fondo de respaldo
};

// --- NUEVA FUNCIÓN ---
// Convierte un timestamp de Unix a una hora legible (ej: "6:45 AM").
export const formatTime = (unixTimestamp) => {
  // Multiplicamos por 1000 porque JavaScript espera milisegundos.
  const date = new Date(unixTimestamp * 1000);
  // Usamos toLocaleTimeString para formatear la hora de forma amigable
  // según la configuración local del usuario.
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};