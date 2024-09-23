import React from 'react';

const DailyForecast = ({ dailyWeather }) => {
  if (!dailyWeather || dailyWeather.length === 0) {
    return <div className="daily-forecast">
      <p>Loading daily forecast...</p>
      </div>
  }

  return (
    <div className="daily-forecast">
      <h3>The Next Days Forecast</h3>
      <div className="forecast-options">
        <button>5 days</button>
        <button>14 days</button>
        <button>30 days</button>
      </div>
      {dailyWeather.map((day, index) => (
        <div key={index} className="day-forecast">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p> {/* Date conversion */}
          <p>{day.weather[0].description}</p> {/* Weather condition */}
          <p>{Math.round(day.temp.min)}°C - {Math.round(day.temp.max)}°C</p> {/* Min and Max Temps */}
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
