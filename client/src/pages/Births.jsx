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
import BirthCard from '../components/Births/BirthCard';
import NewBirth from '../components/Births/NewBirth';
import BirthRow from '../components/Births/BirthRow';
import useFetch from '../hooks/useFetch';

const Births = () => {
  const { data } = useFetch('/births');
  const [births, setBirths] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [birthDateFilter, setBirthDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredBirths = births?.filter(
    (birth) =>
      (birthDateFilter === '' || birth.birthDate === birthDateFilter) &&
      (searchTerm === '' || birth.motherCowId.toString().includes(searchTerm))
  );

  // Pagination logic
  const indexOfLastBirth = currentPage * itemsPerPage;
  const indexOfFirstBirth = indexOfLastBirth - itemsPerPage;
  const currentBirths = filteredBirths?.slice(
    indexOfFirstBirth,
    indexOfLastBirth
  );

  useEffect(() => {
    setBirths(data?.births);
  }, [data]);

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Cow Births
      </Heading>

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
        <NewBirth setBirths={setBirths} />
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
            {currentBirths?.map((birth) => (
              <BirthRow key={birth.id} birth={birth} setBirths={setBirths} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SimpleGrid
        display={{ base: 'grid', md: 'none' }}
        columns={1}
        spacing={4}
      >
        {currentBirths?.map((birth) => (
          <BirthCard key={birth.id} birth={birth} setBirths={setBirths} />
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
          {Math.min(indexOfLastBirth, filteredBirths?.length)} of{' '}
          {filteredBirths?.length} Births
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
                  Math.ceil(filteredBirths?.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastBirth >= filteredBirths?.length}
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
