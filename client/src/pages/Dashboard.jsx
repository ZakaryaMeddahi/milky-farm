import { useState } from 'react';
import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import StatCard from '../components/Dashboard/StatCard';
import MilkProductionChart from '../components/Dashboard/MilkProductionChart';
import BirthsChart from '../components/Dashboard/BirthsChart';

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
        <StatCard
          label='Total Cows'
          value={150}
          helpText='5% increase from last month'
        />
        <StatCard
          label='Milk Production'
          value='1,200 L'
          helpText='Last 7 days'
        />
        <StatCard label='Total Births' value={11} helpText='Last 30 days' />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <MilkProductionChart />
        <BirthsChart />
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
