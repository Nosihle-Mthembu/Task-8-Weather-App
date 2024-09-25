import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyWeather'; // Ensure the import matches the filename
import DailyForecast from './components/DailyWeather';
import SearchBar from './components/SearchBar'; // Import the SearchBar component
import './index.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState('');
  const apiKey = '235407757cdf98cace4e2245ea49690a';

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const currentResponse = await axios.get(url);
      setCurrentWeather(currentResponse.data);

      const forecastResponse = await axios.get(forecastUrl);
      const filteredDaily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setDailyWeather(filteredDaily);
      setHourlyWeather(forecastResponse.data.list.slice(0, 8)); // Hourly for today
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (city) => {
    setLocation(city);
  };

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="weather-app">
      <div className="main-content">
        <Header city={currentWeather ? currentWeather.name : ''}
        date={dateString} 
        time={timeString} />
        <SearchBar onSearch={handleSearch} />
        {currentWeather && <CurrentWeather weather={currentWeather} />}
        <HourlyForecast hourlyWeather={hourlyWeather} />
      </div>
      <div className="daily-forecast">
        <DailyForecast dailyWeather={dailyWeather} />
      </div>
    </div>
  );
}

export default App;
