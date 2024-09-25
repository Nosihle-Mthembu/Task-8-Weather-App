import React from 'react';

const DailyForecast = ({ dailyWeather }) => {
  return (
      <div>
      <h3>The Next Days Forecast</h3>
      <div className="forecast-options">
        <button>Daily</button>
        <button>Weekly</button>
      </div>
      {dailyWeather.map((day, index) => (
        <div key={index} className="day-forecast">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>Temperature: {day.main.temp} °C</p>
          <p>Weather: {day.weather[0].description}</p>
        </div>
      ))}
      </div>
  );
};

export default DailyForecast;
