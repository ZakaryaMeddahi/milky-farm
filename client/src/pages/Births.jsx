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
import BirthCard from '../components/Births/BirthCard';

// Mock data for demonstration
const initialBirths = [
  {
    id: 1,
    birthDate: '2023-05-15',
    motherCowId: 1,
  },
  {
    id: 2,
    birthDate: '2023-06-20',
    motherCowId: 2,
  },
  {
    id: 3,
    birthDate: '2023-07-10',
    motherCowId: 3,
  },
  {
    id: 4,
    birthDate: '2023-08-05',
    motherCowId: 4,
  },
  {
    id: 5,
    birthDate: '2023-08-05',
    motherCowId: 4,
  },
  {
    id: 6,
    birthDate: '2023-08-05',
    motherCowId: 4,
  },
];

const Births = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [birthDateFilter, setBirthDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredBirths = initialBirths.filter(
    (birth) =>
      (birthDateFilter === '' || birth.birthDate === birthDateFilter) &&
      (searchTerm === '' || birth.motherCowId.toString().includes(searchTerm))
  );

  // Pagination logic
  const indexOfLastBirth = currentPage * itemsPerPage;
  const indexOfFirstBirth = indexOfLastBirth - itemsPerPage;
  console.log(indexOfFirstBirth, indexOfLastBirth);
  const currentBirths = filteredBirths.slice(
    indexOfFirstBirth,
    indexOfLastBirth
  );

  console.log(currentBirths);

  return (
    <Box>
      <Heading mb={6}>Cow Births</Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', md: 'row' }}>
        <Input
          placeholder='Search by Cow ID'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w='100%'
        />
        <Input
          type='date'
          placeholder='Filter by Birth Date'
          value={birthDateFilter}
          onChange={(e) => setBirthDateFilter(e.target.value)}
          w='100%'
        />
      </Stack>

      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table variant='simple'>
          <TableCaption>List of Births</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Birth Date</Th>
              <Th>Mother ID</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBirths.map((birth) => (
              <Tr key={birth.id}>
                <Td>{birth.id}</Td>
                <Td>{birth.birthDate}</Td>
                <Td>{birth.motherCowId}</Td>
                <Td>
                  <IconButton
                    colorScheme='green'
                    size='sm'
                    aria-label='Edit cow'
                    icon={<EditIcon />}
                  />
                  <IconButton
                    colorScheme='red'
                    size='sm'
                    ml={2}
                    aria-label='Delete cow'
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
        {currentBirths.map((birth) => (
          <BirthCard key={birth.id} birth={birth} />
        ))}
      </SimpleGrid>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        mt={6}
      >
        <Text>
          Showing {indexOfFirstBirth + 1} to{' '}
          {Math.min(indexOfLastBirth, filteredBirths.length)} of{' '}
          {filteredBirths.length} Births
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
                  Math.ceil(filteredBirths.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastBirth >= filteredBirths.length}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Births;
