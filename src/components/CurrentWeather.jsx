import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faCloudRain } from '@fortawesome/free-solid-svg-icons';

const CurrentWeather = ({ weather }) => {
  if (!weather) return <p>Loading current weather...</p>;

  return (
    <div className="current-weather">
      <h1>{weather.weather[0].description}</h1> {/* Current weather description */}
      <div className="temp-wind">
        <h2>{Math.round(weather.temp)}°C</h2> {/* Current temperature */}
        <p>
          <FontAwesomeIcon icon={faWind} /> {weather.wind_deg}°, {weather.wind_speed} m/s {/* Wind speed and direction */}
        </p>
        <p>
          <FontAwesomeIcon icon={faCloudRain} /> {weather.weather[0].main} {/* Main weather condition */}
        </p>
      </div>
    </div>
  );
}

export default CurrentWeather;
