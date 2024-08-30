import { useState } from 'react';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const milkProductionData = [
  { date: '2023-08-23', quantity: 100 },
  { date: '2023-08-24', quantity: 120 },
  { date: '2023-08-25', quantity: 80 },
  { date: '2023-08-26', quantity: 110 },
  { date: '2023-08-27', quantity: 90 },
  { date: '2023-08-28', quantity: 130 },
  { date: '2023-08-29', quantity: 100 },
];

const MilkProductionChart = () => {
  const [milkDuration, setMilkDuration] = useState('7');

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={4}>
        <Heading size='md'>Milk Production</Heading>
        <Select
          value={milkDuration}
          onChange={(e) => setMilkDuration(e.target.value)}
          w='150px'
        >
          <option value='7'>Last 7 days</option>
          <option value='30'>Last 30 days</option>
        </Select>
      </Flex>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={milkProductionData}>
          <CartesianGrid strokeDasharray='10 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Bar animationDuration={1500} dataKey='quantity' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MilkProductionChart;
