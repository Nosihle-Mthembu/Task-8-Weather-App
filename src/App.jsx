import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyWeather';
import DailyForecast from './components/DailyWeather';
import SearchBar from './components/SearchBar';
import Alerts from './components/alerts';
import './index.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [backgroundClass, setBackgroundClass] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [alerts, setAlerts] = useState([]);
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
      setCurrentWeather(currentResponse.data);
      saveLocation(city);

      const forecastResponse = await axios.get(forecastUrl);
      const filteredDaily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setDailyWeather(filteredDaily);
      setHourlyWeather(forecastResponse.data.list.slice(0, 8));
      updateBackground(currentResponse.data.weather[0].main);

      localStorage.setItem('cachedWeather', JSON.stringify({
        current: currentResponse.data,
        daily: filteredDaily,
        hourly: forecastResponse.data.list.slice(0, 8)
      }));
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherDataWithAlerts = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    
    try {
      const response = await axios.get(url);
      console.log(response.data);
      
      if (response.data.alerts) {
        setAlerts(response.data.alerts);
        console.log("Weather Alerts:", response.data.alerts); 
      } else {
        setAlerts([]);
        console.log("No alerts available");
      }
    } catch (error) {
      console.error('Error fetching weather data with alerts:', error);
    }
  };

  const handleSearch = (city) => {
    setLocation(city);
  };

  const saveLocation = (city) => {
    if (!savedLocations.includes(city)) {
      const updatedLocations = [...savedLocations, city];
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    }
  };

  const handleSavedLocationClick = (city) => {
    setLocation(city); 
  };

  const handleLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const fetchWeatherDataByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const currentResponse = await axios.get(url);
      setCurrentWeather(currentResponse.data);
      fetchWeatherDataWithAlerts(lat, lon);

      const forecastResponse = await axios.get(forecastUrl);
      const filteredDaily = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setDailyWeather(filteredDaily);
      setHourlyWeather(forecastResponse.data.list.slice(0, 8));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const updateBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        setBackgroundClass('sunny');
        break;
      case 'Rain':
        setBackgroundClass('rainy');
        break;
      case 'Clouds':
        setBackgroundClass('cloudy');
        break;
      case 'Snow':
        setBackgroundClass('snowy');
        break;
      default:
        setBackgroundClass('');
    }
  };


  return (
    <div className={`weather-app ${backgroundClass}`}>
      <div className="main-content">
        <Header city={currentWeather ? currentWeather.name : ''}
        date={dateString} 
        time={timeString} />
        <SearchBar onSearch={handleSearch} onLocate={handleLocate} />
        <button className='toggleTemp' onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>

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
        <Alerts alerts={alerts} />
        {currentWeather && <CurrentWeather weather={currentWeather} unit={unit} />}
        <HourlyForecast hourlyWeather={hourlyWeather} unit={unit} />
        
      </div>
      <div className="daily-forecast">
        <DailyForecast dailyWeather={dailyWeather} unit={unit} />
      </div>
    </div>
  );
}

export default App;
