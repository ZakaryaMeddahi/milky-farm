import { useState } from 'react';
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
  Select,
  Button,
  SimpleGrid,
  Text,
  HStack,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CowCard from '../components/Cows/CowCard';
import { BREEDS } from '../config/constants';
import NewCow from '../components/Cows/NewCow';
import CowRow from '../components/Cows/CowRow';

const cowsData = [
  { id: 1, entryDate: '2023-01-15', breed: 'Holstein', births: 2 },
  { id: 2, entryDate: '2023-02-20', breed: 'Jersey', births: 1 },
  { id: 3, entryDate: '2023-03-10', breed: 'Angus', births: 0 },
  { id: 4, entryDate: '2023-04-05', breed: 'Hereford', births: 3 },
  { id: 5, entryDate: '2023-05-12', breed: 'Simmental', births: 1 },
  { id: 6, entryDate: '2023-05-12', breed: 'Simmental', births: 1 },
];

const Cows = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCows = cowsData.filter(
    (cow) =>
      (breedFilter === '' || cow.breed === breedFilter) &&
      (searchTerm === '' || cow.id.toString().includes(searchTerm))
  );

  const indexOfLastCow = currentPage * itemsPerPage;
  const indexOfFirstCow = indexOfLastCow - itemsPerPage;
  const currentCows = filteredCows.slice(indexOfFirstCow, indexOfLastCow);

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Cows
      </Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', md: 'row' }}>
        <Input
          placeholder='Search by Cow ID'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w='100%'
        />
        <Select
          placeholder='Filter by Breed'
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          w='100%'
        >
          {BREEDS.map((breed) => (
            <option key={breed.id} value={breed.name}>
              {breed.name}
            </option>
          ))}
        </Select>
        <NewCow />
      </Stack>

      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table variant='simple'>
          <TableCaption>List of Cows</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Entry Date</Th>
              <Th>Breed</Th>
              <Th>Births</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentCows.map((cow) => (
              <CowRow key={cow.id} cow={cow} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SimpleGrid
        display={{ base: 'grid', md: 'none' }}
        columns={1}
        spacing={4}
      >
        {currentCows.map((cow) => (
          <CowCard key={cow.id} cow={cow} />
        ))}
      </SimpleGrid>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        mt={6}
      >
        <Text>
          Showing {indexOfFirstCow + 1} to{' '}
          {Math.min(indexOfLastCow, filteredCows.length)} of{' '}
          {filteredCows.length} cows
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
                  Math.ceil(filteredCows.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastCow >= filteredCows.length}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Cows;
