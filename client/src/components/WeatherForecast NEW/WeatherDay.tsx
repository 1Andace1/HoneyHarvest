// * Компонент для отображения более подробных данных о погоде одного дня (пеердает их при клиеке на элемент)
// ~ НАДО УСТАНОВИТЬ: npm install date-fns
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './WeatherDay.css';
import { WeatherDayProps } from './types/weatherData';

const WeatherDay = ({ day, onClick }: WeatherDayProps): JSX.Element => {
  // console.log('Date:', day.date);

  if (!day || !day.date) {
    console.error('Invalid date value:', day ? day.date : 'day is undefined');
    return <div>Invalid date</div>;
  }
  let formattedDate;
  try {
    formattedDate = format(new Date(day.date), 'd MMMM (EEEE)', { locale: ru });
  } catch (error) {
    console.error('Error formatting date:', error);
    return <div>Invalid date</div>;
  }

  return (
    <div className="weather-day" onClick={onClick}>
      <h4>{formattedDate}</h4>
      <img className="weather-icon" src={day.weatherIcon} alt="weather icon" />
      <p>{day.description}</p>
      <p>
        Min {day.minTemp}°C / Max{day.maxTemp}°C
      </p>
    </div>
  );
};

export default WeatherDay;
