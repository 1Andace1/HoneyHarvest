import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { WeatherData } from './types/weatherData';
import WeatherDay from './WeatherDay';
import './WeatherForecast.css';
import { Box, Button, Flex } from '@chakra-ui/react';

const WeatherForecast: React.FC = (): JSX.Element => {
  const defaultCity = 'Москва';
  const [selectedDay, setSelectedDay] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(defaultCity);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [daysToShow, setDaysToShow] = useState<number>(7);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityNameFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Ошибка геолокации:', error);
          fetchWeatherDataFromAPI(defaultCity);
        }
      );
    } else {
      console.error('Геолокация не поддерживается этим браузером.');
      fetchWeatherDataFromAPI(defaultCity);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchCityNameFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await axios.get(
        'https://api.bigdatacloud.net/data/reverse-geocode-client',
        {
          params: {
            latitude,
            longitude,
            localityLanguage: 'ru',
          },
        }
      );
      const city = response.data.city || defaultCity;
      setCity(city);
      fetchWeatherDataFromAPI(city);
    } catch (error) {
      console.error('Ошибка в получении данных о местоположении:', error);
      fetchWeatherDataFromAPI(defaultCity);
    }
  };

  const fetchWeatherDataFromAPI = async (city: string) => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            q: city,
            lang: 'ru',
            units: 'metric',
            appid: '99e0c898b1f7f1468ec90102289ead55',
          },
        }
      );
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
          city: 'Москва'
        };
      } else {
        groupedByDate[date].minTemp = Math.min(
          groupedByDate[date].minTemp,
          item.main.temp_min
        );
        groupedByDate[date].maxTemp = Math.max(
          groupedByDate[date].maxTemp,
          item.main.temp_max
        );
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

  const visibleWeatherData = weatherData.slice(
    startIndex,
    startIndex + daysToShow
  );

  return (
    <Box className="weather-container">
      <div className="weather-forecast-container">
        <Flex
          w="100%"
          alignItems="flex-start"
          justifyContent="space-around"
        >
          <Box w="20%" className="left-section">
            <div className="city-input">
              {selectedDay && (
                <div className="detailed-forecast">
                  <h2>Прогноз погоды на {selectedDay.date}</h2>
                  <img src={selectedDay.weatherIcon} alt="weather icon" />
                  <p>{selectedDay.description}</p>
                  <p>Минимальная: {selectedDay.minTemp}°C</p>
                  <p>Максимальная : {selectedDay.maxTemp}°C</p>
                </div>
              )}
              <input
                type="text"
                placeholder="Введите город"
                value={city}
                onChange={handleCityChange}
              />
              <Button onClick={handleCitySubmit}>Обновить</Button>
            </div>
          </Box>
          <Box w="75%" className="right-section">
            {weatherData.length > 0 &&
              visibleWeatherData.map((day) => (
                <WeatherDay key={day.date} day={day} onDayClick={handleDayClick} />
              ))}
          </Box>
        </Flex>
      </div>
    </Box>
  );
};

export default WeatherForecast;