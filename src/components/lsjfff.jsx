import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyWeather';
import DailyForecast from './components/DailyWeather';
import SearchBar from './components/SearchBar';
import './index.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);

  const apiKey = '235407757cdf98cace4e2245ea49690a';

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
    setSavedLocations(storedLocations);
    const cachedWeather = JSON.parse(localStorage.getItem('cachedWeather'));
    if (cachedWeather) {
  
      setCurrentWeather(cachedWeather.current);
      setDailyWeather(cachedWeather.daily);
      setHourlyWeather(cachedWeather.hourly);
    }

    if (location) {
      fetchWeatherData(location);
    }
  }, [location, unit]);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      const currentResponse = await axios.get(url);
      const forecastResponse = await axios.get(forecastUrl);
      const filteredDaily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setCurrentWeather(currentResponse.data);
      setDailyWeather(filteredDaily);
      setHourlyWeather(forecastResponse.data.list.slice(0, 8));
      
      // Save weather data to local storage
      localStorage.setItem('cachedWeather', JSON.stringify({
        current: currentResponse.data,
        daily: filteredDaily,
        hourly: forecastResponse.data.list.slice(0, 8)
      }));
      
      saveLocation(city); // Call to save the location
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (city) => {
    setLocation(city);
  };

  const saveLocation = (city) => {
    if (!savedLocations.includes(city)) {
      const updatedLocations = [...savedLocations, city];
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations)); // Save to local storage
    }
  };

  const handleSavedLocationClick = (city) => {
    setLocation(city); // Set the location to the clicked saved location
  };

  return (
    <div className="weather-app">
      <div className="main-content">
        <Header city={currentWeather ? currentWeather.name : ''} />
        <SearchBar onSearch={handleSearch} />
        
        {/* Render Saved Locations */}
        <div className="saved-locations">
          <h4>Saved Locations:</h4>
          <ul>
            {savedLocations.map((city, index) => (
              <li key={index} onClick={() => handleSavedLocationClick(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>

        {currentWeather && <CurrentWeather weather={currentWeather} unit={unit} />}
        <HourlyForecast hourlyWeather={hourlyWeather} unit={unit} />
        <DailyForecast dailyWeather={dailyWeather} unit={unit} />
      </div>
    </div>
  );
};

export default App;
