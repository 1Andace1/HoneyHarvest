// & Тут API погоды 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const WeatherComponent2 = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const latitude = 55.751244; // Example latitude
  const longitude = 37.618423; // Example longitude
  const apiKey = '6b57de46-9b39-41be-ab48-ac48e05b9aac'; // Replace with your Yandex API key
  const headers = {
    'X-Yandex-Weather-Key': apiKey
};
  useEffect(() => {
    const fetchWeatherData = async () => {
      // const url = `https://api.weather.yandex.ru/v2/forecast?lat=${latitude}&lon=${longitude}`;
      try {
        const response = await fetch('https://api.weather.yandex.ru/v2/forecast?lat=52.37125&lon=4.89388', { headers })
    .then(response => response.json())
    .then(json => console.log(json));

        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [latitude, longitude, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching weather data: {error.message}</div>;
  }
  return (
    <div>
      <h1>Weather Data</h1>
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  );
};
export default WeatherComponent2;