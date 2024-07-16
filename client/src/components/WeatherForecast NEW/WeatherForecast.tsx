import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { WeatherData } from './types/weatherData';
import WeatherDay from './WeatherDay';
import './WeatherForecast.css';
import { Box, Flex } from '@chakra-ui/react';

const WeatherForecast: React.FC = (): JSX.Element => {
  const defaultCity = 'Moscow';
  const [selectedDay, setSelectedDay] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(defaultCity);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [daysToShow, setDaysToShow] = useState<number>(5);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchCityNameFromCoordinates(latitude, longitude);
      });
    } else {
      console.error('Геолокация не поддерживается этим браузером.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchCityNameFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client', {
        params: {
          latitude,
          longitude,
          localityLanguage: 'ru',
        },
      });
      const city = response.data.city;
      setCity(city);
      fetchWeatherDataFromAPI(city);
    } catch (error) {
      console.error('Ошибка в получении данных о местоположении:', error);
    }
  };

  const fetchWeatherDataFromAPI = async (city: string) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: city,
          lang: 'ru',
          units: 'metric',
          appid: '99e0c898b1f7f1468ec90102289ead55',
        },
      });
      const dailyWeatherData = groupWeatherDataByDay(response.data.list);
      setWeatherData(dailyWeatherData);
    } catch (error) {
      console.error('Ошибка при получении данных с API:', error);
    }
  };

  useEffect(() => {
    fetchWeatherDataFromAPI(city);
  }, [city]);

  useEffect(() => {
    if (weatherData.length > 0) {
      setSelectedDay(weatherData[0]);
    }
  }, [weatherData]);

  const groupWeatherDataByDay = (weatherList: any[]): WeatherData[] => {
    const groupedData: WeatherData[] = [];
    const groupedByDate: { [key: string]: WeatherData } = {};

    weatherList.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!groupedByDate[date]) {
        groupedByDate[date] = {
          date: date,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          description: item.weather[0].description,
          weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      } else {
        groupedByDate[date].minTemp = Math.min(groupedByDate[date].minTemp, item.main.temp_min);
        groupedByDate[date].maxTemp = Math.max(groupedByDate[date].maxTemp, item.main.temp_max);
      }
    });

    Object.keys(groupedByDate).forEach((key) => {
      groupedData.push(groupedByDate[key]);
    });

    return groupedData;
  };

  const drawChart = () => {
    if (chartRef.current && weatherData.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const labels = weatherData.map((day) => day.date);
      const minTemps = weatherData.map((day) => day.minTemp);
      const maxTemps = weatherData.map((day) => day.maxTemp);

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Минимальная температура (°C)',
              data: minTemps,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fill: true,
            },
            {
              label: 'Максимальная температура (°C)',
              data: maxTemps,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Дата',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Температура (°C)',
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (weatherData.length > 0) {
      drawChart();
    }
  }, [weatherData]);

  const handleDayClick = (day: WeatherData) => {
    setSelectedDay(day);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = () => {
    fetchWeatherDataFromAPI(city);
    setStartIndex(0);
    console.log(`Прогноз погоды для ${city}`);
  };

  const handleNextDays = () => {
    setStartIndex((prevIndex) => prevIndex + daysToShow);
  };

  const handlePreviousDays = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - daysToShow, 0));
  };

  const handleSelectDays = (numberOfDays: number) => {
    setDaysToShow(numberOfDays);
    setStartIndex(0);
    console.log(`Прогноз погоды на ${numberOfDays} дней`);
  };

  const visibleWeatherData = weatherData.slice(startIndex, startIndex + daysToShow);

  
  return (
    <Box  bg="#C6F6D5"> <div className="weather-forecast-container" >
      <Flex w="100%" alignItems="flex-start" justifyContent="space-between" bg="#F0FFF4">
  <Box
    key={1}
    p={4}
    borderWidth={1}
    borderRadius="md"
    w="20%" // Пример ширины одной карточки (можете настроить по вашему желанию)

      bg="#C6F6D5"
   style={{
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
     }}
  >

  <div className="city-input">
          <input
            type="text"
            placeholder="Введите название города"
            value={city}
            onChange={handleCityChange}
            style={{ fontSize: '1.1rem' }}
          />
          <button onClick={handleCitySubmit}>Обновить</button>
        </div>
        {selectedDay && (
          <div className="detailed-forecast">
    
            <h2 className="bold-text">
              Прогноз погоды на {selectedDay.date}  </h2>
              <img src={selectedDay.weatherIcon} alt="weather icon" />
              <p className="bold-text">{selectedDay.description}</p>
            <p>Минимальная: {selectedDay.minTemp}°C</p>
            <p>Максимальная : {selectedDay.maxTemp}°C</p>
            
          </div>
          
        )}
     
    {/* Содержимое первой карточки */}
  </Box>
  <Box
    key={2}
    p={4}
    borderWidth={1}
    borderRadius="md"
    w="80%" // Пример ширины одной карточки (можете настроить по вашему желанию)
  bg="#C6F6D5"
  >
    {/* Содержимое второй карточки */}
    <div >
        {weatherData.length > 0 &&
          visibleWeatherData.map((day, index) => (
            <WeatherDay key={index} day={day} onClick={handleDayClick} />
          ))}
      </div>
      <Box w="100%" alignItems="center" justifyContent="centre">
  {Array.from({ length: daysToShow }, (_, index) => (

 <WeatherDay key={index} day={visibleWeatherData[index]} onClick={handleDayClick} />

  ))}
</Box>
  </Box>
 
</Flex>
    </div></Box>
   
  );
};

export default WeatherForecast;