import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';

type UserProfileCardProps = {
  user: {
    username: string;
    email: string;
    photo?: string;
  };
};

 {/* 🟪 БЛОК ПРОФИЛЯ  */}
const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {



  
  return (
           <Box
      bg="RGBA(0, 0, 0, 0.24)"
      color="#f8f9fb"
      p={6}
      borderRadius="md"
      w="full"
      maxW="md"
      boxShadow="md"
      // textAlign="left"
      textAlign="center"
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
        boxSize="150px"
        borderRadius="full"
        mx="auto"
        mb={4}
      />
      <Text fontSize="lg" fontWeight="bold">
        Имя: {user.username}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Ваш email: {user.email}
      </Text>
      
      <Button
        colorScheme="blue"
        mt={4}
        bg="#2F855A"
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.800' }}
        _focus={{ boxShadow: 'none' }}
        // onClick={() => {
        //   setIsEditing(true);
        //   onOpen();
        // }}
        onClick={onEdit} // ^ new Onclck изменила и добавила onEdit
      >
        Редактировать профиль
      </Button>
    </Box>
  );
};

export default UserProfileCard;

