import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BirthsChart = ({ births }) => {
  const birthsStats = [];

  const last7DaysBirths = births?.filter((birth) => {
    const today = new Date();
    const last7Days = new Date(today.setDate(today.getDate() - 7));
    return new Date(birth.birthDate) > last7Days;
  });

  last7DaysBirths?.forEach((birth) => {
    const existingDate = birthsStats.find(
      (stat) => stat.birthDate === birth.birthDate
    );

    if (existingDate) {
      existingDate.births += 1;
    } else {
      birthsStats.push({ birthDate: birth.birthDate, births: 1 });
    }
  });

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={4}>
        <Heading size='md'>Births</Heading>
        <Text>Last 7 days</Text>
      </Flex>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={birthsStats}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='birthDate' />
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
