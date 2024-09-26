import React from 'react';

const HourlyForecast = ({ hourlyWeather, unit }) => {
  if (!hourlyWeather.length) {
    return <p>Loading hourly forecast...</p>;
  }

  return (
    <div className="hourly-forecast">
      {hourlyWeather.map((hour, index) => (
          <div key={index} className="hour">
            <p>{new Date(hour.dt * 1000).getHours()}:00</p>
            <p>{hour.weather[0].description}</p>
            <p>{Math.round(hour.main.temp)}° {unit === 'metric' ? 'C' : 'F'}</p>
          </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
