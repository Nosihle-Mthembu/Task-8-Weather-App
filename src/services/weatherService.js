const API_KEY = 'dc0fc4b16f77c98bdd23b1fd59374c06'; // Use your own API key

export const getWeatherDetails = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      return {
        current: data.current,
        hourly: data.hourly,
        daily: data.daily,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching weather details:', error);
    return null; // Return null in case of an error
  }
};

// Optional: Fetch weather by city name
export const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    return null; // Return null in case of an error
  }
};