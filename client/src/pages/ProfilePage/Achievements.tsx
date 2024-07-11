import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Image } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import LoyaltyProgram from './LoyaltyProgram';

const loyaltyProgram = new LoyaltyProgram();

const Achievements = ({ userId }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
          // `${import.meta.env.VITE_API}/profile/purchase-history/${user.id}`
        const response = await axiosInstance.get(`${import.meta.env.VITE_API}/profile/achievements/${userId}`);
        const userActions = response.data;
        loyaltyProgram.updateAchievementStatus(userActions);
        setAchievements(loyaltyProgram.getAchievements());
      } catch (error) {
        console.error('Ошибка при получении достижений пользователя:', error);
      }
    };

    fetchAchievements();
  }, [userId]);

  return (
    <Box>
      <Heading as="h3" size="lg">Достижения и бейджи</Heading>
      <VStack spacing={4}>
        {achievements.map(achievement => (
          <Box key={achievement.id} p={4} borderWidth={1} borderRadius="md" w="full">
            <Image src={achievement.icon} alt={achievement.name} boxSize="50px" />
            <Text>{achievement.name}</Text>
            <Text>{achievement.description}</Text>
            <Text>{achievement.isCompleted ? 'Завершено' : 'Не завершено'}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Achievements;