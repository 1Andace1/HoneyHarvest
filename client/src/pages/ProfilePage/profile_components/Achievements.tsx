import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  GridItem,
  Grid,
} from '@chakra-ui/react';

import axiosInstance from '../../../axiosInstance';
import LoyaltyProgram from './../LoyaltyProgram';
import styles from '../ProfilePage.module.css';

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

        const updatedAchievements = loyaltyProgram
          .getAchievements()
          .sort((a, b) => {
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
    <Box
      bg="#C6F6D5"
      w="100%"
      h="100%"
      borderRadius="20px"
      p={6}
    >
      <Heading
        as="h2"
        size="lg"
        mb={6}
        fontSize="1.3rem"
        style={{ fontFamily: "'Bona Nova SC', cursive", color: '#4A5568' }}
      >
        Достижения и бейджи
      </Heading>
      <Grid templateRows="repeat(3, 1fr)" gap={4} ml={10}>
        {achievements.map((achievement) => (
          <GridItem key={achievement.id} display="flex" justifyContent="center">
            <Box
              // borderWidth={1}
              p={2}
              w="90%" // Установите меньшую ширину для сужения карточек
              h="90%"
              borderRadius="20px"
              bg={achievement.isCompleted ? '#9AE6B4' : '#48BB78'}
              opacity={achievement.isCompleted ? 1 : 0.5}
              transition="opacity 0.3s ease-in-out"
              transform="scale(1.1)"
              style={{
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                background:
                  'linear-gradient(to right, hsl(60, 70%, 80%), hsl(100,300%, 90%))',
                resize: 'both',
                clipPath: 'circle(70% at center)',
                cursor: 'pointer',
              }}
              _hover={{
                opacity: 1,
                transform: 'scale(1.2)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
              cursor="pointer"
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                h="100%"
                style={{ color: '#718096' }}
              >
                <Image
                  src={achievement.icon}
                  alt={achievement.name}
                  boxSize="50px"
                  mr={2}
                />
                <VStack align="flex-start" w="100%">
                  <Text fontWeight="bold" fontSize="0.8rem" lineHeight="1">
                    {achievement.name}
                  </Text>
                  <Text mb={1} fontSize="0.7rem">
                    {achievement.isCompleted
                      ? achievement.descriptionDone
                      : achievement.description}
                  </Text>
                  {!achievement.isCompleted && (
                    <Text fontSize="0.7rem" color="gray.500" lineHeight="0.1">
                      IN PROGRESS...
                    </Text>
                  )}
                </VStack>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements;
