import React, { useEffect, useState } from 'react';
import  { Box, Heading, Text, VStack, Image, Flex }from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import LoyaltyProgram from './LoyaltyProgram';

const loyaltyProgram = new LoyaltyProgram();

const Achievements = ({ userId }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        console.log('____Achievements userId:', userId);
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_API}/profile/achievements/${userId}`
        );
        const userActions = response.data;
        // console.log('____Achievements response.data:', response.data);
        loyaltyProgram.updateAchievementStatus(userActions);

        const updatedAchievements = loyaltyProgram.getAchievements().sort((a, b) => {
          // Сначала отобразить завершенные достижения
          if (a.isCompleted && !b.isCompleted) return -1;
          if (!a.isCompleted && b.isCompleted) return 1;
          return 0;
        });

        setAchievements(updatedAchievements);
      } catch (error) {
        console.error('Ошибка при получении достижений пользователя:', error);
      }
    };

    fetchAchievements();
  }, [userId]);

  return (
    <Box    width="100%" w="full">
      <Heading as="h3" size="lg">
        Достижения и бейджи
      </Heading>
      <VStack spacing={4}>
        {achievements.map((achievement) => (
          <Box
            key={achievement.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            w="full"
            bg={achievement.isCompleted ? '#FFFFF0' : 'gray.200'}
            opacity={achievement.isCompleted ? 1 : 0.5}
          >
            <Flex alignItems="center">
              <Image
                src={achievement.icon}
                alt={achievement.name}
                boxSize="50px"
                mr={4}
              />
              <VStack align="flex-start">
                <Text fontWeight="bold" fontSize="lg">
                  {achievement.name}
                </Text>
                <Text>
                  {achievement.isCompleted
                    ? achievement.descriptionDone
                    : achievement.description}
                </Text>
                <Text>
                  {achievement.isCompleted ? '' : 'IN PROGRESS...'}
                </Text>
              </VStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Achievements;
