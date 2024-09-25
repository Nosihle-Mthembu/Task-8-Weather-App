import React from 'react';

const HourlyForecast = ({ hourlyWeather }) => {
  if (!hourlyWeather.length) {
    return <p>Loading hourly forecast...</p>;
  }

  return (
    <div className="hourly-forecast">
      {hourlyWeather.map((hour, index) => (
        <div key={index} className="hour">
          <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="icon" />
          <p>{Math.round(hour.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
