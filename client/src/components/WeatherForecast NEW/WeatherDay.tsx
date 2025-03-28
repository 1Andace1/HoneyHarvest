import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './WeatherForecast.css';
import { WeatherDayProps } from './types/weatherData';

const WeatherDay: React.FC<WeatherDayProps & { onDayClick: (day: WeatherDayProps) => void }> = ({
  day,
  onDayClick,
}): JSX.Element => {
  if (!day || !day.date) {
    console.error('Invalid date value:', day ? day.date : 'day is undefined');
    return <div>Invalid date</div>;
  }

  let formattedDate;
  try {
    formattedDate = format(new Date(day.date), 'EEEE, d MMMM', {
      locale: ru,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return <div>Invalid date</div>;
  }

  return (
    <div
      className="weather-day"
      onClick={() => onDayClick(day)}
    >
      <img src={day.weatherIcon} alt="weather icon" />
      <h4 className="bold-text">{formattedDate}</h4>
      <p>{day.description}</p>
      <p>Min: {day.minTemp}°C</p>
      <p>Max: {day.maxTemp}°C</p>
    </div>
  );
};

export default WeatherDay;