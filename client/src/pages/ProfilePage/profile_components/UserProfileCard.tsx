import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import styles from '../ProfilePage.module.css';

type UserProfileCardProps = {
  user: {
    username: string;
    email: string;
    photo?: string;
  };
  onEdit?: () => void; // добавляем опциональное свойство onEdit
};

{
  /* 🟪 БЛОК ПРОФИЛЯ  */
}
const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {
  return (
    <Box
      bg="rgba(198, 246, 213, 0.8)"
      w="100%" // Ширина 100% от родительского элемента
      h="100%" // Высота 100% от родительского элемента
      p="30px" // Внутренние отступы со всех сторон (измените по необходимости)
      m="30px" // Внешние отступы со всех сторон (измените по необходимости)
      // w={{ base: '50%', md: '80%', lg: '60%' }}
      maxW="100%" // Максимальная ширина 100% от родительского элемента
      maxH="100%" // Максимальная высота 100% от родительского элемента
      mx="auto" // Автоматические отступы по горизонтали для центрирования
      my="20px" // Отступы по вертикали
      boxShadow="md"
      textAlign="center"
      className={styles.boxСontainer}
      flexDirection="column" // ! Устанавливаем вертикальное расположение элементов
      display="flex" 
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      transition="all 0.3s ease" // Добавляем время для плавных переходов
      borderRadius="18px" 
      _hover={{
         transform: 'scale(1.02)', 
        boxShadow: 'lg', 
      }}
    >
      <Image
        // src={user.photo ? `http://localhost:3000/${user.photo}` : 'http://localhost:3000/no-photo.jpg'}
        // ^ new добавktybt случайный параметр к URL изображения t=${new Date().getTime()}? tckb dlehu ghj,jktvf bp-0pf ['ibhjdyfbz]
        src={
          user.photo
            ? `http://localhost:3000/${user.photo}?t=${new Date().getTime()}`
            : 'http://localhost:3000/no-photo.jpg'
        } // ^
        alt="Profile Photo"
        // boxSize="65%"
        // boxSize={{ base: '50%', md: '40%', lg: '30%' }}
        borderRadius="full"
        mx="auto"
        style={{
          width: '5vw', // 30% от ширины окна браузера
          height: '5vw', // пропорционально ширине
          borderRadius: '50%',
          display: 'block',
          margin: '0 auto',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
          background:
            'linear-gradient(to right, hsl(60, 70%, 50%), hsl(100, 70%, 70%))',
          resize: 'both',
          clipPath: 'circle(70% at center)',
        }}
      />

      <Text fontSize="0.9rem" fontWeight="bold" color="gray.500" mt={5}>
        Имя: {user.username}
      </Text>
      <Text fontSize="0.9rem" color="gray.500">
        Email: {user.email}
      </Text>

      <Button
        size="sm" // Уменьшаем размер кнопки до small (sm)
        bg="rgb(139, 189, 108)"
        color="#ffffff" // Цвет текста
        _hover={{ bg: '#8bbd6c'}}
        _active={{ bg: '#89ac76' }}
        _focus={{
          borderColor: '#89ac76',
          boxShadow: '#89ac76',
          outline: 'none',
        }}
        fontSize="0.7rem" // Увеличиваем размер шрифта кнопки
        width="auto" // Устанавливаем ширину кнопки "по содержимому"
        padding="0.95rem 2.3rem" // Увеличиваем padding для увеличения размера кнопки
        onClick={onEdit ? onEdit : undefined}
      >
        Редактировать
      </Button>
    </Box>
  );
};

export default UserProfileCard;
