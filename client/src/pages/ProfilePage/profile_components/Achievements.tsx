import React, { useEffect, useState } from 'react';
import  { Box, Heading, Text, VStack, Image, Flex, GridItem, Grid, Spacer }from '@chakra-ui/react';
import axiosInstance from '../../../axiosInstance';
import LoyaltyProgram from './../LoyaltyProgram';

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

    <Box w="100%" bg="#C6F6D5" p={10} borderRadius="md" boxShadow="lg">
    <Heading as="h3" size="lg" mb={10}>
      Достижения и бейджи
    </Heading>
    <Grid templateColumns="repeat(3, 1fr)"   cursor="pointer" gap={4}>
      {achievements.map((achievement) => (
        <GridItem key={achievement.id}>
          <Box
            p={4}
            borderWidth={1}
            borderRadius="22%" // Делаем карточку круглой
            w="280px"
            h="280px"
            
            bg={achievement.isCompleted ? '#9AE6B4' : '#48BB78'}
            opacity={achievement.isCompleted ? 1 : 0.5}
           transition="all 0.5s ease-in-out"
          //  transform="rotate(-10deg)"
            transform="scale(1.1)"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
            style={{
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
              // filter: 'grayscale(100%) sepia(80%)',
              background: 'linear-gradient(to right, hsl(60, 70%, 50%), hsl(100, 70%, 70%))',
              resize: 'both',
              clipPath: 'circle(70% at center)',
              cursor: 'pointer',
            }}
          >
              {/* <Text fontSize="1.1rem" color="gray.500">
                                 </Text> */}
            <Flex alignItems="center" justifyContent="center" h="100%">
              <Image src={achievement.icon} alt={achievement.name} boxSize="70px" mr={4} />
              <VStack align="flex-start" w="100%">
                <Text fontWeight="bold" fontSize="1.4rem" mb={2}>
                  {achievement.name}
                </Text>
                <Text mb={2} fontSize="1.1rem">
                  {achievement.isCompleted
                    ? achievement.descriptionDone
                    : achievement.description}
                </Text>
                <Text  mb={5}>{achievement.isCompleted ? '' : 'IN PROGRESS...'}</Text>
              </VStack>
            </Flex >
          </Box>
        </GridItem>
      ))}
    </Grid>
  </Box>
  );
};

export default Achievements;
