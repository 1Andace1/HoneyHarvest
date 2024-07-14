// import React from 'react';
// import { Box, Heading, Text, HStack , Image } from '@chakra-ui/react';
// import LoyaltyProgram from './LoyaltyProgram';

// const loyaltyProgram = new LoyaltyProgram();

// const LoyaltyProgramComponent = ({ userTotalSpent }) => {
//   // ^ new  функция для получения уровня лояльности и вознаграждения пользователя
//   const getUserLoyaltyInfo = () => {
//     const userLevel = loyaltyProgram.getUserLevel(userTotalSpent); // Получаем уровень пользователя
//     const reward = loyaltyProgram.getReward(userTotalSpent); //  !!! ДОБАВИТЬ СКИДКИ РАСЧИТАТЬ...ПОДУМАТЬ
//     return { userLevel, reward };
//   };

//   // return (

//     <Box
//     bg="RGBA(0, 0, 0, 0.36)"
//     color="#f8f9fb"
//     p={6}
//     borderRadius="2md"
//     w="full"
//     // maxW="md" // УМЕНЬШЕНИЕ , ДЕЛАЕТ ПОМЕНЬШЕ
//     boxShadow="md"
//     textAlign="left"
//     mb={8}
//     width="100%"
//     >
//       <Text fontSize="xl" fontWeight="bold" mb={4}>
//         Программа лояльности
//       </Text>
//       <Text>
//         Уровень: <span>{getUserLoyaltyInfo().userLevel}</span>
//       </Text>

//       <HStack alignItems="center" mt={2}>
//       <Image
//           src="http://localhost:3000/icons/honey_1.png"
//           alt="Icon"
//           boxSize="30px" // Размер изображения, подберите под ваш дизайн
//           />
//         <Text>
//           Ваша скидка: <span>{getUserLoyaltyInfo().reward}</span>
//         </Text>

//       </HStack>
//     </Box>
//   );
// };
// export default LoyaltyProgramComponent;
