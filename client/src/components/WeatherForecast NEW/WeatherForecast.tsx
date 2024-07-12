// * Компонент для списка дней с кратким прогнозом (и возможностью щелкнуть на подробнее)

// ^  Установка библиотеки Chart.js для создания графиков
// ~ npm install chart.js
// ! useRef используется для сохранения ссылки на <canvas> элемент
// ! Только это помогло решить проблему в Релизе 4 с Canvas is already in use
// ^ Intl.DateTimeFormat для более дружественного отображения дат.
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import React, { useState, useEffect, useRef } from 'react';
import { WeatherData } from './types/weatherData';
import WeatherDay from './WeatherDay';
import './WeatherForecast.css';
// import { WeatherForecastProps } from '../types';
// import {
//   fakeWeatherData,
//   fakeWeatherDataMoscow,
//   fakeWeatherDataBali,
// } from '../data/fakeWeatherData';
import axios from 'axios';
import Chart from 'chart.js/auto'; // *release 4

const WeatherForecast = (): JSX.Element => {
  const defaultCity = 'Moscow';
  // const [selectedDay, setSelectedDay] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(defaultCity); //  для выбранного города
  const [startIndex, setStartIndex] = useState<number>(0); // старт отображения
  const [daysToShow, setDaysToShow] = useState<number>(2); // дни для отображения, по умолч. 5 дней
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]); // * Релиз 3: данные о погоде

  const chartRef = useRef<HTMLCanvasElement>(null); // * РЕЛИЗ 4: сылка на элемент canvas для графика
  const chartInstance = useRef<Chart | null>(null); // чтобы не было ошибки Canvas is already in use (хранение экз)
  // * Релиз 3:функция для получения данных с API
  //  99e0c898b1f7f1468ec90102289ead55
  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  //  api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=99e0c898b1f7f1468ec90102289ead55
  //  https://api.openweathermap.org/data/2.5/forecast?q=Dubai&appid=99e0c898b1f7f1468ec90102289ead55

  // ^ NEW функция для получения координат пользователя:
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

  // ^ NEW APIдля определения города пользхователя по геолокации из браузера по ширине и долготе
  const fetchCityNameFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client`,
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            localityLanguage: 'ru',
          },
        }
      );
      const city = response.data.city;
      setCity(city);
      fetchWeatherDataFromAPI(city);
    } catch (error) {
      console.error('Ошибка в получении данных о местоположении:', error);
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
      //     const formatDate = (dateString: string): string => {
      //       const date = new Date(dateString);
      //       return format(date, 'd MMMM (EEEE)', { locale: ru });
      //     };
      //     const weatherData = response.data.list.map((item: any) => ({
      //       date: formatDate(item.dt_txt),
      //       minTemp: item.main.temp_min,
      //       maxTemp: item.main.temp_max,
      //       description: item.weather[0].description,
      //       weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      //     }));
      //     setWeatherData(weatherData);
      //   } catch (error) {
      //     console.error('Ошибка в получении данных с API:', error);
      //   }
      // };
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
    // После загрузки weatherData установим selectedDay на первый день, если есть данные
    if (weatherData.length > 0) {
      setSelectedDay(
        weatherData[0].morning || weatherData[0].day || weatherData[0].evening
      );
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
          morning: null,
          day: null,
          evening: null,
        };
      }

      const time = item.dt_txt.split(' ')[1].split(':')[0]; 
      const weatherDetails = {
        date: item.dt_txt, // Ensure each weather entry has a date
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        description: item.weather[0].description,
        weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };

      if (time === '09') {
        groupedByDate[date].morning = weatherDetails;
      } else if (time === '15') {
        groupedByDate[date].day = weatherDetails;
      } else if (time === '21') {
        groupedByDate[date].evening = weatherDetails;
      }
    });

    Object.keys(groupedByDate).forEach((key) => {
      groupedData.push(groupedByDate[key]);
    });

    return groupedData;
  };
  // * добавление запроса к API (к городу по дефолту для красоты) при монтировании компонента
  useEffect(() => {
    fetchWeatherDataFromAPI(city);
  }, [city]);

  // * РЕЛИЗ 4: Отрисовка графика при обновлении weatherData
  // useEffect(() => {
  //   if (weatherData.length > 0) {
  //     if (chartInstance.current) {
  //       chartInstance.current.destroy(); //удаляем график перед созданием нового (=чтобы не было ошибки Canvas is already in use)
  //     }
  //     drawChart();
  //   }
  // }, [weatherData]);
  useEffect(() => {
    if (weatherData.length > 0) {
      console.log('Loaded weather data:', weatherData);
      setSelectedDay(weatherData[0].morning || weatherData[0].day || weatherData[0].evening);
    } else {
      console.error('No weather data available');
    }
  }, [weatherData]);

  // Функция для отрисовки графика с использованием Chart.js
  const drawChart = () => {
    if (chartRef.current && weatherData.length > 0) {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); //чтобы точно удалился этот предыддущ график
        }
        const labels = weatherData.map((day) => day.date);
        const minTemps = weatherData.map((day) => day.minTemp);
        const maxTemps = weatherData.map((day) => day.maxTemp);

        new Chart(chartRef.current, {
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
    }
  };

  // обработчик клика по дню (подробная информация дня)
  const handleDayClick = (day: WeatherData) => {
    setSelectedDay(day);
  };
  //  обновление состояния города при изменение города в поле ввода
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  // обработчик кнопки обновления погоды по инпуту городу
  const handleCitySubmit = () => {
    // const newWeatherData = fetchWeatherData(city);
    // setCity(city);
    // * изменения по Релизу 3:
    fetchWeatherDataFromAPI(city);
    setStartIndex(0);
    console.log(`Прогноз погоды для ${city}`);
  };
  // листать на +5 или X дней
  const handleNextDays = () => {
    setStartIndex((prevIndex) => prevIndex + daysToShow); // Перелистываем на следующие X дней
  };

  // листать на -5 или X дней:
  const handlePreviousDays = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - daysToShow, 0));
  };

  const handleSelectDays = (numberOfDays: number) => {
    setDaysToShow(numberOfDays);
    setStartIndex(0);
    console.log(`Прогноз погоды на ${numberOfDays} дней`);
  };

  // массив данных для отображения по выбору пользователя
  // const visibleWeatherData = fetchWeatherData(city).slice(
  //   startIndex,
  //   startIndex + daysToShow
  // ); // показываем сколько надо дней
  // * Релиз 3:
  const visibleWeatherData = weatherData.slice(
    startIndex,
    startIndex + daysToShow
  );

  return (
    <div className="weather-forecast-container">
      {/* ФОРМА для ввода города */}
      <div className="city-input">
        <input
          type="text"
          placeholder="Введите название города"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleCitySubmit}> Обновить </button>

        <div className="city-input">
        {weatherData.length > 0 &&
          visibleWeatherData.map((day, index) => (
            <div key={index}>
              {day.morning && (
                <WeatherDay
                  day={day.morning}
                  onClick={() => handleDayClick(day.morning)}
                />
              )}
              {day.day && (
                <WeatherDay
                  day={day.day}
                  onClick={() => handleDayClick(day.day)}
                />
              )}
              {day.evening && (
                <WeatherDay
                  day={day.evening}
                  onClick={() => handleDayClick(day.evening)}
                />
              )}
            </div>
          ))}
      </div>
      {/* КОМПОНЕНТЫ для отображения краткого прогноза погоды */}
      {/* <div className="weather-forecast">
        {visibleWeatherData.map((day, index) => (
          <WeatherDay
            key={index}
            day={day}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </div> */}
      <div className="weather-forecast">
        {/* {weatherData.length > 0 &&
          visibleWeatherData.map((day, index) => (
            <div key={index}>
              {day.morning && (
                <WeatherDay
                  day={day.morning}
                  onClick={() => handleDayClick(day.morning)}
                />
              )}
              {day.day && (
                <WeatherDay
                  day={day.day}
                  onClick={() => handleDayClick(day.day)}
                />
              )}
              {day.evening && (
                <WeatherDay
                  day={day.evening}
                  onClick={() => handleDayClick(day.evening)}
                />
              )}
            </div>
          ))} */}
      </div>

      {/*НАВИГАЦИЯ: кнопки и селектор для выбора дней */}
      <hr />
      {/* <div className="navigation">
        <button onClick={handlePreviousDays}>◀◀</button>
        <button onClick={handleNextDays}>▶▶</button>
        <div className="navigation">
          <button className="nav-button" onClick={() => handleSelectDays(3)}>
            3 дня
          </button>
          <button className="nav-button" onClick={() => handleSelectDays(5)}>
            5 дней
          </button>
          <button className="nav-button" onClick={() => handleSelectDays(7)}>
            7 дней
          </button>
         </div>
      </div> */}
      {/* <div className="chart-container">
        <canvas key={Math.random()} ref={chartRef}></canvas>
      </div> */}
      {/* ПОДРОБНЫЙ ПРОГНОЗ погоды для выбранного дня */}
      {/* {selectedDay && (
        <div className="detailed-forecast">
          <h2> Прогноз погоды на {selectedDay.date}</h2>
          <p>{selectedDay.description}</p>
          <p>Минимальная температура: {selectedDay.minTemp}°C</p>
          <p>Максимальная температура:: {selectedDay.maxTemp}°C</p>
          <img src={selectedDay.weatherIcon} alt="weather icon" />
        </div>
      )} */}
    </div>
    </div>
  );
};

export default WeatherForecast;
