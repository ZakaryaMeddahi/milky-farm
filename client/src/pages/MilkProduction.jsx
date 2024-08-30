import { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  IconButton,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import MilkProdCard from '../components/MilkProduction/MilkProdCard';

// Mock data for demonstration
const initialMilkProds = [
  {
    id: 1,
    productionDate: '2023-05-15',
    quantity: 30,
  },
  {
    id: 2,
    productionDate: '2023-06-20',
    quantity: 30,
  },
  {
    id: 3,
    productionDate: '2023-07-10',
    quantity: 30,
  },
  {
    id: 4,
    productionDate: '2023-08-05',
    quantity: 50,
  },
  {
    id: 5,
    productionDate: '2023-08-05',
    quantity: 50,
  },
  {
    id: 6,
    productionDate: '2023-08-05',
    quantity: 50,
  },
];

const MilkProduction = () => {
  const [prodDateFilter, setProdDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMilkProds = initialMilkProds.filter(
    (milkProd) =>
      prodDateFilter === '' || milkProd.productionDate === prodDateFilter
  );

  const indexOfLastMilkProd = currentPage * itemsPerPage;
  const indexOfFirstMilkProd = indexOfLastMilkProd - itemsPerPage;
  const currentMilkProds = filteredMilkProds.slice(
    indexOfFirstMilkProd,
    indexOfLastMilkProd
  );

  return (
    <Box>
      <Heading mb={6}>Milk Production</Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', md: 'row' }}>
        <Input
          type='date'
          placeholder='Filter by Production Date'
          value={prodDateFilter}
          onChange={(e) => setProdDateFilter(e.target.value)}
          w='100%'
        />
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
            {currentMilkProds.map((milkProd) => (
              <Tr key={milkProd.id}>
                <Td>{milkProd.productionDate}</Td>
                <Td>{milkProd.quantity}</Td>
                <Td>
                  <IconButton
                    colorScheme='green'
                    size='sm'
                    aria-label='Edit milk production'
                    icon={<EditIcon />}
                  />
                  <IconButton
                    colorScheme='red'
                    size='sm'
                    ml={2}
                    aria-label='Delete milk production'
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SimpleGrid
        display={{ base: 'grid', md: 'none' }}
        columns={1}
        spacing={4}
      >
        {currentMilkProds.map((milkProd) => (
          <MilkProdCard key={milkProd.id} milkProd={milkProd} />
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
          {Math.min(indexOfLastMilkProd, filteredMilkProds.length)} of{' '}
          {filteredMilkProds.length} Production
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
                  Math.ceil(filteredMilkProds.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastMilkProd >= filteredMilkProds.length}
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
