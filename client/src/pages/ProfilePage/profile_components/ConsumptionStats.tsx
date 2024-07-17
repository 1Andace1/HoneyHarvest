// import React from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// //  для статистики
// interface Stat {
//     name: string;
//     orders: number;
//     totalSpent: number;
//   }
  
//   //  для свойств компонента
//   interface ConsumptionStatsProps {
//     stats: Stat[];
//   }
// const ConsumptionStats = ({ stats }) => {
//     if (!stats || stats.length === 0) {
//         return <div>No data available</div>;
//       }

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={stats}
//         margin={{
//           top: 20, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="orders" fill="#8884d8" />
//         <Bar dataKey="totalSpent" fill="#82ca9d" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default ConsumptionStats;