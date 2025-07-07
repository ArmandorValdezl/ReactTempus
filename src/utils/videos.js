// Este objeto mapea las condiciones climáticas a las URL de los videos de fondo.
// Usar un mapa como este hace que sea fácil de actualizar o cambiar los videos en el futuro.
export const videoMap = {
  clear: "https://videos.pexels.com/video-files/32886594/14016145_2560_1440_25fps.mp4",
  clouds: "https://videos.pexels.com/video-files/1893623/1893623-uhd_2560_1440_25fps.mp4",
  rain: "https://videos.pexels.com/video-files/3816627/3816627-hd_1920_1080_30fps.mp4",
  drizzle: "https://videos.pexels.com/video-files/3264587/3264587-uhd_2560_1440_30fps.mp4",
  thunderstorm: "https://videos.pexels.com/video-files/30843215/13190467_2560_1440_32fps.mp4",
  snow: "https://videos.pexels.com/video-files/3280158/3280158-hd_1920_1080_24fps.mp4",
  mist: "https://videos.pexels.com/video-files/3152730/3152730-uhd_2560_1440_30fps.mp4",
  fog: "https://videos.pexels.com/video-files/854752/854752-hd_1920_1080_30fps.mp4",
  default: "https://videos.pexels.com/video-files/3152730/3152730-uhd_2560_1440_30fps.mp4",
};

// Esta función de ayuda selecciona el video correcto basándose en la descripción del clima.
export const getVideoForWeather = (weather) => {
  if (!weather) return videoMap.default;
  const main = weather.toLowerCase();

  if (main.includes('clear')) return videoMap.clear;
  if (main.includes('clouds')) return videoMap.clouds;
  if (main.includes('rain')) return videoMap.rain;
  if (main.includes('drizzle')) return videoMap.drizzle;
  if (main.includes('thunderstorm')) return videoMap.thunderstorm;
  if (main.includes('snow')) return videoMap.snow;
  if (main.includes('mist') || main.includes('fog')) return videoMap.fog;
  
  return videoMap.default;
};
