import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather'; // Component for current weather
import HourlyForecast from './HourlyWeather';  // Component for hourly weather
import DailyForecast from './DailyWeather';    // Component for daily weather

const ForecastSwitch = ({ currentWeather, hourlyWeather, dailyWeather, lat, lon }) => {
  const [forecastType, setForecastType] = useState('current');

  const renderForecast = () => {
    switch (forecastType) {
      case 'current':
        return <CurrentWeather weather={currentWeather} />;
      case 'hourly':
        return <HourlyForecast hourlyWeather={hourlyWeather} lat={lat} lon={lon} />;
      case 'daily':
        return <DailyForecast dailyWeather={dailyWeather} />;
      default:
        return <CurrentWeather weather={currentWeather} />;
    }
  };

  return (
    <div>
      <div className="forecast-switch">
        <button onClick={() => setForecastType('current')}>Current</button>
        <button onClick={() => setForecastType('hourly')}>Hourly</button>
        <button onClick={() => setForecastType('daily')}>Daily</button>
      </div>
      <div className="forecast-display">
        {renderForecast()}
      </div>
    </div>
  );
};

export default ForecastSwitch;
