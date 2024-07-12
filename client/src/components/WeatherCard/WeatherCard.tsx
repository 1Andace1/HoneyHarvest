// & Тут API погоды 

import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import './WeatherCard.module.css';
import SunnyImage from "../../../public/weatherIcons/weather.png"

// ! С OPEN WEATHER: 

const WeatherCard = ({ cityId  }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            id: cityId,
            lang: 'ru',
            units: 'metric',
            appid: '99e0c898b1f7f1468ec90102289ead55'
          }
        });
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (cityId) {
      fetchWeather();
    }
  }, [cityId]);

  if (!weather) {
    return <Spinner size="xl" color="teal.500" />;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      bg="teal.50"
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
        <Image
          boxSize="100px"
          src= {SunnyImage}
          // src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          // src={`https://openweathermap.org/img/wn/02d@2x.png`}
          alt="weather icon"
        />
      </Flex>
    </Box>
  );
};
//     <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
//       <Text fontSize="lg">Location: {weather.name}</Text>
//       <Text>Temperature: {weather.main.temp}°C</Text>
//       <Text>Feels Like: {weather.main.feels_like}°C</Text>
//       <Text>Condition: {weather.weather[0].description}</Text>
//       <Text>Wind Speed: {weather.wind.speed} m/s</Text>
//       <Text>Humidity: {weather.main.humidity}%</Text>
//       <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@02d.png`} alt="weather icon" />
//     </Box>
//   );
// };

export default WeatherCard;

// ! С ЯНДЕКС ПОГОДОЙ: 
// const WeatherCard = ({ lat, lon }) => {
//   const [weather, setWeather] = useState(null);
//   console.log('weather1====',weather)

//   const accessKey = '6b57de46-9b39-41be-ab48-ac48e05b9aac';

//   const headers = {
//     'X-Yandex-Weather-Key': accessKey
// };

//     useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const response = await fetch('https://api.weather.yandex.ru/v2/forecast?lat=52.37125&lon=4.89388', { headers })
//         .then(response => response.json())
//         .then(json => console.log(json));
//         setWeather(response.data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     };

//     if (lat && lon) {
//       fetchWeather();
//     }
//   }, [lat, lon, accessKey]);

//   if (!weather) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
//       <Text fontSize="lg">Location: {weather.info.lat}, {weather.info.lon}</Text>
//       <Text>Temperature: {weather.fact.temp}°C</Text>
//       <Text>Feels Like: {weather.fact.feels_like}°C</Text>
//       <Text>Condition: {weather.fact.condition}</Text>
//       <Text>Wind Speed: {weather.fact.wind_speed} m/s</Text>
//       <Text>Humidity: {weather.fact.humidity}%</Text>
//       <img src={`https://yastatic.net/weather/i/icons/funky/dark/${weather.fact.icon}.svg`} alt="weather icon" />
//     </Box>
//   );
// };

// export default WeatherCard;