import React from 'react';
import './QuoteDisplay.css';
import BeeAnimation from './BeeAnimation';

const quotes = [
  <span>"Мёд – это не просто сладость, это любовь в банке.<br /> <br />Каждый день можно делать сладким, если добавить немного мёда!"</span>,
  // "Когда жизнь дает тебе лимоны, добавь мёда и сделай лимонад!",
  // "Каждая ложка мёда – это кусочек счастья.",
  // "Мёд – это сладкий эликсир жизни!",
  // "Делай всё с удовольствием, как мёд в чае.",
  // "Секрет счастья в маленьких вещах, например, в мёде.",
  // "Каждый день можно делать сладким, если добавить немного мёда!",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const QuoteDisplay: React.FC = () => {
  return (
    <div className="quote-container">
      <BeeAnimation /> {/* Добавляем компонент с анимацией пчелы */}
      {quotes.map((quote, index) => (
        <div key={index} className="quote-text">
          {quote}
        </div>
      ))}
    </div>
  );
};

export default QuoteDisplay;