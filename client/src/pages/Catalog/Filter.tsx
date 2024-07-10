import React, { useState } from "react";
import { Box, Select, Button, VStack, HStack, Text } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark
} from '@chakra-ui/react';
import './Catalog.css'

interface FilterProps {
  onFilterChange: (filter: { category: string; sort: string; location: string; starsRating: number; maxPrice: number }) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [location, setLocation] = useState("");
  const [starsRating, setStarsRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000); 

  const handleFilter = () => {
    onFilterChange({ category, sort, location, starsRating, maxPrice });
  };

  return (
    <VStack spacing={4} align="start" className="filter-component">
      <Box>
        <Select borderColor={'black'}
        className="choise"
         backgroundColor={'black'}
          placeholder="Выберите категорию"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option  style={{backgroundColor: 'black'}}value="мёд">Мед</option>
          <option style={{backgroundColor: 'black'}}value="перга">Перга</option>
          <option  style={{backgroundColor: 'black'}}value="прополис">Прополис</option>
          <option  style={{backgroundColor: 'black'}}value="воск">Воск</option>
        </Select>
      </Box>
      <Box>
        <Select borderColor={'black'}
        backgroundColor={'black'}
className="choise"
          placeholder="Выберите сорт"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
           
          <option style={{backgroundColor: 'black'}} value="кипрейный" >Кипрейный</option>
          <option   style={{backgroundColor: 'black'}}value="гранулированная">Гранулированная</option>
          <option   style={{backgroundColor: 'black'}}value="прополис">Прополис</option>
          <option   style={{backgroundColor: 'black'}}value="пчелиный">Пчелиный</option>
          <option   style={{backgroundColor: 'black'}}value="цветочный">Цветочный</option>
          <option   style={{backgroundColor: 'black'}}value="акациевый">Акациевый</option>
          <option   style={{backgroundColor: 'black'}}value="таволговый">Таволговый</option>
          <option  style={{backgroundColor: 'black'}} value="липовый">Липовый</option>
         
        </Select>
      </Box>
      <Box>
        <Select color={"white"} className="choise" borderColor={'black'}
         
          placeholder="Выберите локацию"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          backgroundColor={'black'}
        >
          <option  style={{backgroundColor: 'black'}}value="Башкирия">Башкирия</option>
          <option  style={{backgroundColor: 'black'}}value="Алтай">Алтай</option>
          <option style={{backgroundColor: 'black'}} value="Кавказ">Кавказ</option>
        </Select>
      </Box>
      <Box>
        <Select borderColor={'black'}
        className="choise"
         backgroundColor={'black'}
          placeholder="Выберите рейтинг"
          value={starsRating}
          onChange={(e) => setStarsRating(Number(e.target.value))}
        >
          <option  style={{backgroundColor: 'black'}}value={0}>0 звезд</option>
          <option  style={{backgroundColor: 'black'}}value={1}>1 звезда</option>
          <option  style={{backgroundColor: 'black'}}value={2}>2 звезды</option>
          <option  style={{backgroundColor: 'black'}}value={3}>3 звезды</option>
          <option  style={{backgroundColor: 'black'}}value={4}>4 звезды</option>
          <option  style={{backgroundColor: 'black'}}value={5}>5 звезд</option>
        </Select>
      </Box>
      <Box width="190px">
        <Slider colorScheme="yellow"
          aria-label="slider-ex-1"
          defaultValue={100}
          min={0}
          max={3000}
          onChange={(value) => setMaxPrice(value)}
        >
          <SliderMark value={0} mt="2" ml="-2.5" fontSize="sm">
            0
          </SliderMark>
          <SliderMark value={3000} mt="2" ml="-2.5" fontSize="sm">
            300р
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text mt="2" textAlign="center" fontSize="sm">
         Цена:  {maxPrice.toString().slice(0, -1) || 0}р  /100 гр
        </Text>
      </Box>
      <Button colorScheme="yellow"  onClick={handleFilter}>
        Применить фильтр
      </Button>
    </VStack>
  );
};

export default FilterComponent;