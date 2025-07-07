import React from 'react';
import { getVideoForWeather } from '../utils/videos';

export const VideoBackground = ({ weatherCondition }) => {
  const videoSrc = getVideoForWeather(weatherCondition);

  return (
    // Usamos 'fixed' para asegurar que cubra toda la pantalla, independientemente del scroll.
    // El z-index negativo (-z-10) lo pone detrás de todo lo demás.
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <video
        // El 'key' es importante para que React re-monte el video cuando la fuente cambia.
        key={videoSrc}
        className="w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        // 'playsInline' es importante para la compatibilidad en móviles, especialmente iOS.
        playsInline
      />
    </div>
  );
};
