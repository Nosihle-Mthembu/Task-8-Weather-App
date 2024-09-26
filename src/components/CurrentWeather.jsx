import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';

const CurrentWeather = ({ weather, unit }) => {
  const temperature = Math.round(weather.main.temp);

  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      <p>{weather.name}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
      <p>Temperature: {temperature}° {unit === 'metric' ? 'C' : 'F'}</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>
        <FontAwesomeIcon icon={faWind} /> {weather.wind.deg}°, {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default CurrentWeather;
