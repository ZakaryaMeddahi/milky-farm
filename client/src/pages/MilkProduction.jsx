import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Heading,
  Input,
  Button,
  SimpleGrid,
  Text,
  HStack,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import MilkProdCard from '../components/MilkProduction/MilkProdCard';
import ProdRow from '../components/MilkProduction/ProdRow';
import NewProd from '../components/MilkProduction/NewProd';
import useFetch from '../hooks/useFetch';

const MilkProduction = () => {
  const { data } = useFetch('/milk-production');
  const [milkProds, setMilkProds] = useState();
  const [prodDateFilter, setProdDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredMilkProds = milkProds?.filter(
    (milkProd) =>
      prodDateFilter === '' || milkProd.productionDate === prodDateFilter
  );

  // Pagination logic
  const indexOfLastMilkProd = currentPage * itemsPerPage;
  const indexOfFirstMilkProd = indexOfLastMilkProd - itemsPerPage;
  const currentMilkProds = filteredMilkProds?.slice(
    indexOfFirstMilkProd,
    indexOfLastMilkProd
  );

  useEffect(() => {
    setMilkProds(data?.milkProductions);
  }, [data]);

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Milk Production
      </Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', md: 'row' }}>
        <Input
          type='date'
          placeholder='Filter by Production Date'
          value={prodDateFilter}
          onChange={(e) => setProdDateFilter(e.target.value)}
          w='100%'
        />
        <NewProd setMilkProds={setMilkProds} />
      </Stack>

      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table variant='simple'>
          <TableCaption>List of Milk Production</TableCaption>
          <Thead>
            <Tr>
              <Th>Production Date</Th>
              <Th>Quantity</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentMilkProds?.map((milkProd) => (
              <ProdRow
                key={milkProd.id}
                milkProd={milkProd}
                setMilkProds={setMilkProds}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SimpleGrid
        display={{ base: 'grid', md: 'none' }}
        columns={1}
        spacing={4}
      >
        {currentMilkProds?.map((milkProd) => (
          <MilkProdCard
            key={milkProd.id}
            milkProd={milkProd}
            setMilkProds={setMilkProds}
          />
        ))}
      </SimpleGrid>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        mt={6}
      >
        <Text>
          Showing {indexOfFirstMilkProd + 1} to{' '}
          {Math.min(indexOfLastMilkProd, filteredMilkProds?.length)} of{' '}
          {filteredMilkProds?.length} Production
        </Text>
        <HStack>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            leftIcon={<ChevronLeftIcon />}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredMilkProds?.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastMilkProd >= filteredMilkProds?.length}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default MilkProduction;
