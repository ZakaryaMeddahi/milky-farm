import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const MilkProductionChart = ({ milkProduction }) => {
  const last7DaysProd = milkProduction?.filter((prod) => {
    const today = new Date();
    const last7Days = new Date(today.setDate(today.getDate() - 7));
    return new Date(prod.productionDate) > last7Days;
  });

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={4}>
        <Heading size='md'>Milk Production</Heading>
        <Text>Last 7 days</Text>
      </Flex>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={last7DaysProd}>
          <CartesianGrid strokeDasharray='10 3' />
          <XAxis dataKey='productionDate' />
          <YAxis />
          <Tooltip />
          <Bar animationDuration={1500} dataKey='quantity' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MilkProductionChart;
