import React from 'react';

const DailyForecast = ({ dailyWeather, unit}) => {
  return (
    <div>
      <h3>The Next Days Forecast</h3>
      <div className="forecast-options">
        <button onClick={() => toggleView('daily')}>Daily</button>
        <button onClick={() => toggleView('weekly')}>Weekly</button>
      </div>
      {dailyWeather.map((day, index) => (
        <div key={index} className="day-forecast">
          <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
          <p>Temperature: {Math.round(day.main.temp)}° {unit === 'metric' ? 'C' : 'F'}</p>
          <p>Weather: {day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
