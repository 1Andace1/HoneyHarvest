import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import styles from '../ProfilePage.module.css';

type UserProfileCardProps = {
  user: {
    username: string;
    email: string;
    photo?: string;
  };
};

{
  /* 🟪 БЛОК ПРОФИЛЯ  */
}
const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {
  return (
    <Box
      bg="#C6F6D5"
      color="#f8f9fb"
      w="100%"
      h="100%"
      boxShadow="md"
      textAlign="center"
      className={styles.boxСontainer}
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
        boxSize="100%"
        borderRadius="full"
        mx="auto"
        style={{
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
          // filter: 'grayscale(100%) sepia(80%)',
          background:
            'linear-gradient(to right, hsl(60, 70%, 50%), hsl(100, 70%, 70%))',
          resize: 'both',
          clipPath: 'circle(70% at center)',
        }}
      />

      <Text fontSize="1.5rem" fontWeight="bold" color="gray.500">
        Имя: {user.username}
      </Text>
      <Text fontSize="1.5rem" color="gray.500">
        Email: {user.email}
      </Text>

      <Button
        colorScheme="#48BB78"
        bg="#68D391"
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: '#48BB78' }}
        _focus={{ boxShadow: 'none' }}
        fontSize="1.1rem"
        onClick={onEdit} // ^ new Onclck изменила и добавила onEdit
      >
        Редактировать профиль
      </Button>
    </Box>
  );
};

export default UserProfileCard;
