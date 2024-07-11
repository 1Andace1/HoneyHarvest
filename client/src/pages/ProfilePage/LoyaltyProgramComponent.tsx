import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import LoyaltyProgram from './LoyaltyProgram';

const loyaltyProgram = new LoyaltyProgram();

const LoyaltyProgramComponent = ({ totalSpent }) => {
  const userLevel = loyaltyProgram.getUserLevel(totalSpent);
  const reward = loyaltyProgram.getReward(totalSpent);

  return (
    <Box>
      <Heading as="h3" size="lg">
        Программа лояльности
      </Heading>
      <Text>Ваш уровень: {userLevel}</Text>
      <Text>Награда: {reward}</Text>
    </Box>
  );
};

export default LoyaltyProgramComponent;
