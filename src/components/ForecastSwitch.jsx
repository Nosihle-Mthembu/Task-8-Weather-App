import React, { useState } from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyWeather';
import DailyForecast from './DailyWeather';

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
