import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faCloudRain } from '@fortawesome/free-solid-svg-icons';

// const CurrentWeather = ({ weather }) => {
//   if (!weather) return <p>Loading current weather...</p>;

//   return (
//     <div className="current-weather">
//       <h1>{weather.weather[0].description}</h1>
//       <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
//       <div className="temp-wind">
//         <h2>{Math.round(weather.main.temp)}°C</h2>
//         <p>
//           <FontAwesomeIcon icon={faWind} /> {weather.wind.deg}°, {weather.wind.speed} m/s
//         </p>
//         <p>
//           <FontAwesomeIcon icon={faCloudRain} /> {weather.weather[0].main}
//         </p>
//       </div>
//     </div>
//   );
// }

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
      <p>
        <FontAwesomeIcon icon={faCloudRain} /> {weather.weather[0].main}
      </p>
    </div>
  );
};

export default CurrentWeather;
