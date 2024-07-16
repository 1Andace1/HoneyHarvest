// & Тут API погоды
// ^ new для получения координат полдьзхователя подключаю Geolocation API

import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, Spinner, position } from '@chakra-ui/react';
import axios from 'axios';
import './WeatherCard.module.css';
import SunnyImage from '../../../public/weatherIcons/weather.png';

// ! С OPEN WEATHER:

const WeatherCard_2 = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchWeather = async () => {
      if (coords.lat && coords.lon) {
        try {
          const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
              params: {
                // id: cityId,
                lat: coords.lat,
                lon: coords.lon,
                lang: 'ru',
                units: 'metric',
                appid: '99e0c898b1f7f1468ec90102289ead55',
              },
            }
          );

          setWeather(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchWeather();
  }, [coords]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  const getWeatherIcon = (iconId) => {
    switch (iconId) {
      case '01d':
        return 'wi-day-sunny';
      case '01n':
        return 'wi-night-clear';
      case '02d':
        return 'wi-day-cloudy';
      case '02n':
        return 'wi-night-alt-cloudy';
      //  ? и другие можно добавить
      default:
        return 'wi-na';
    }
  };

  if (!weather) {
    return <Spinner size="xl" color="teal.500" />;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      bg="#C6F6D5"
      borderColor="transparent" // ! Устанавливает цвет границы в прозрачный
      boxShadow="lg"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {weather.name}
      </Text>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            Temperature: {weather.main.temp}°C
          </Text>
          <Text>Feels Like: {weather.main.feels_like}°C</Text>
          <Text>Condition: {weather.weather[0].description}</Text>
          <Text>Wind Speed: {weather.wind.speed} m/s</Text>
          <Text>Humidity: {weather.main.humidity}%</Text>
        </Box>
        {/* <Image
          boxSize="100px"
          // src={SunnyImage}
          // src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          // src={`https://openweathermap.org/img/wn/02d@2x.png`}
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        /> */}
        <i
          className={`wi ${getWeatherIcon(weather.weather[0].icon)}`}
          style={{ fontSize: '100px' }}
        ></i>
      </Flex>
    </Box>
  );
};

export default WeatherCard_2;
