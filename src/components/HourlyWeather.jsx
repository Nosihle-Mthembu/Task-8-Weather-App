import React, { useState, useEffect } from 'react';
import { getWeatherDetails } from '../services/weatherService'; // Import the weather service function

const HourlyForecast = ({ lat, lon }) => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat && lon) {
        const weatherData = await getWeatherDetails(lat, lon);
        if (weatherData) {
          // Limit to the first 12 hours for display, adjust as needed
          setHourlyData(weatherData.hourly.slice(0, 12)); 
        }
      }
    };
    
    fetchWeather();
  }, [lat, lon]); // Re-fetch when lat or lon changes

  if (!hourlyData.length) {
    return <p>Loading hourly forecast...</p>;
  }

  return (
    <div className="hourly-forecast">
      {hourlyData.map((hour, index) => (
        <div key={index} className="hour">
          <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <i className={`wi wi-owm-${hour.weather[0].id}`}></i> {/* Weather icon */}
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
