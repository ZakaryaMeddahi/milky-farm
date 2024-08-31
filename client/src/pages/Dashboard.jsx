import { Box, SimpleGrid, Heading } from '@chakra-ui/react';
import StatCard from '../components/Dashboard/StatCard';
import MilkProductionChart from '../components/Dashboard/MilkProductionChart';
import BirthsChart from '../components/Dashboard/BirthsChart';
import useFetch from '../hooks/useFetch';

const Dashboard = () => {
  const { data: cowsData } = useFetch('/cows');
  const { data: milkProdData } = useFetch('/milk-production');
  const { data: birthsData } = useFetch('/births');
  let productionSum = 0;

  console.log(milkProdData);

  const last7DaysProd = milkProdData?.milkProductions.filter((prod) => {
    const today = new Date();
    const last7Days = new Date(today.setDate(today.getDate() - 7));
    return new Date(prod.productionDate) > last7Days;
  });

  last7DaysProd?.forEach((prod) => {
    productionSum += prod.quantity;
  });

  const last30DaysBirths = birthsData?.births.filter((birth) => {
    const today = new Date();
    const last30Days = new Date(today.setDate(today.getDate() - 30));
    return new Date(birth.birthDate) > last30Days;
  });

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={16}>
        <StatCard
          label='Total Cows'
          value={cowsData?.cows.length}
          // helpText='5% increase from last month'
        />
        <StatCard
          label='Milk Production'
          value={`${productionSum} L`}
          helpText='Last 7 days'
        />
        <StatCard
          label='Total Births'
          value={last30DaysBirths?.length || 0}
          helpText='Last 30 days'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <MilkProductionChart milkProduction={milkProdData?.milkProductions} />
        <BirthsChart births={birthsData?.births} />
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
