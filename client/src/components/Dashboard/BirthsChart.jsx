import { useState } from 'react';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const birthsData = [
  { date: '2023-08-23', births: 2 },
  { date: '2023-08-24', births: 1 },
  { date: '2023-08-25', births: 3 },
  { date: '2023-08-26', births: 0 },
  { date: '2023-08-27', births: 2 },
  { date: '2023-08-28', births: 1 },
  { date: '2023-08-29', births: 2 },
];

const BirthsChart = () => {
  const [birthsDuration, setBirthsDuration] = useState('7');

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={4}>
        <Heading size='md'>Births</Heading>
        <Select
          value={birthsDuration}
          onChange={(e) => setBirthsDuration(e.target.value)}
          w='150px'
        >
          <option value='7'>Last 7 days</option>
          <option value='30'>Last 30 days</option>
        </Select>
      </Flex>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={birthsData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line
            animationDuration={1500}
            type='monotone'
            dataKey='births'
            stroke='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BirthsChart;
