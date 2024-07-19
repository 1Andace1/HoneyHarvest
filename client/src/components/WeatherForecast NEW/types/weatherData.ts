// & В папках types всегда содержатся все интерфейсы TypeScript
// * Создаем Интерфейс WeatherData
// === он описывает структуру объектов данных о погоде

export interface WeatherData {
  date: string; // дата в формате строки
  minTemp: number; // минимальная температура за день
  maxTemp: number; // максимальная температура за день
  description: string; // описание погоды (солнце, облачно и т.д.)
  weatherIcon: string; // путь к иконке погоды
  city: string;
}

// *  WeatherDayProp
// === определяет свойства пропсы для компонента WeatherData
export interface WeatherDayProps {
  day: {
    date: string;
    minTemp: number;
    maxTemp: number;
    description: string;
    weatherIcon: string;
    city: string;
  };
  onClick: () => void;
}

// *  Интерфейс WeatherForecastProps (для ввода городов)
export interface WeatherForecastProps {
  defaultCity: string; //базовое значение для города
}
