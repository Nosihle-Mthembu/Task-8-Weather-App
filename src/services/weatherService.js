// const API_KEY = '37465ca53b147f065a6a650e5132164e'; 

export const getWeatherDetails = async (lat, lon) => {
  const API_KEY = '37465ca53b147f065a6a650e5132164e'; 
  // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
     console.log('Weather details response:', data);
    
    if (response.ok) {
      return {
        current: data.current,
        hourly: data.hourly,
        daily: data.daily,
      };
    } else {
      throw new Error(data.message || 'Error fetching weather details');
    }
  } catch (error) {
    console.error('Error fetching weather details:', error);
    return null;
  }
};

export const getWeatherByCity = async (city) => {
  const API_KEY = '37465ca53b147f065a6a650e5132164e'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather by city response:', data); // Log the response
    
    if (!response.ok) {
      throw new Error(`City not found: ${city}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    return null;
  }
};
