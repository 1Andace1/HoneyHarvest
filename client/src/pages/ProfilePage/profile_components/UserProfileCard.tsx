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
      color="#f8f9fb"
      w="100%"
      h="100%"
      // p="0" m="0"
      // w={{ base: '50%', md: '80%', lg: '60%' }}
      maxW="800px"
      mx="auto"
      my={5}
      boxShadow="md"
      textAlign="center"
      className={styles.boxСontainer}
      p={5} // Уменьшаем padding для компактности
      flexDirection="column" // ! Устанавливаем вертикальное расположение элементов
      display="flex" // Добавляем flex для центрирования элементов по центру
      justifyContent="center" // Центрируем по горизонтали
      alignItems="center" // Центрируем по вертикали
      flexWrap="wrap" //чтобы элементы переносились на новую строку при необходимости
      transition="all  ease" // Плавная анимация перехода
      borderRadius="18px" // Округляем углы блока
      _hover={{
        // Эффекты при наведении
        transform: 'scale(1.02)', // Увеличение масштаба
        boxShadow: 'lg', // Увеличиваем тень при наведении
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
        _hover={{ bg: 'rgb(172, 208, 149)' }}
        _active={{ bg: '#48BB78' }}
        _focus={{
          borderColor: 'rgb(139, 189, 108)',
          boxShadow: '0 0 0 3px rgb(139, 189, 108)',
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
