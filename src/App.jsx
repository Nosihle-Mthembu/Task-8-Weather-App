import React from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyWeather';
import DailyForecast from './components/DailyWeather';
import './index.css';

const App = () => {
  return (
    <div className="weather-app">
      <div className="main-content">
        <Header />
        <CurrentWeather />
        <HourlyForecast />
      </div>
      <DailyForecast />
    </div>
  );
}

export default App;
