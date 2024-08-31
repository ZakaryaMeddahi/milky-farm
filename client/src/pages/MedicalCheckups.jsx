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
  Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CheckupCard from '../components/MedicalCheckups/CheckupCard';
import CheckupRow from '../components/MedicalCheckups/CheckupRow';
import NewCheckup from '../components/MedicalCheckups/NewCheckup';
import useFetch from '../hooks/useFetch';

const MedicalCheckups = () => {
  const { data } = useFetch('/medical-checkups');
  const [medicalCheckups, setMedicalCheckups] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [checkupDateFilter, setCheckupDateFilter] = useState('');
  const [illnessFilter, setIllnessFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredCheckups = medicalCheckups?.filter(
    (checkup) =>
      (checkupDateFilter === '' || checkup.checkupDate === checkupDateFilter) &&
      (searchTerm === '' || checkup.cowId.toString().includes(searchTerm)) &&
      (illnessFilter === '' || checkup.illness === illnessFilter)
  );

  // Pagination logic
  const indexOfLastCheckup = currentPage * itemsPerPage;
  const indexOfFirstCheckup = indexOfLastCheckup - itemsPerPage;
  const currentCheckups = filteredCheckups?.slice(
    indexOfFirstCheckup,
    indexOfLastCheckup
  );

  const illnesses = [
    ...new Set(data?.medicalCheckups.map((checkup) => checkup.illness)),
  ];

  useEffect(() => {
    setMedicalCheckups(data?.medicalCheckups);
  }, [data]);

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Medical Checkups
      </Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', lg: 'row' }}>
        <Input
          placeholder='Search by Cow ID'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w='100%'
        />
        <Input
          type='date'
          placeholder='Filter by Checkup Date'
          value={checkupDateFilter}
          onChange={(e) => setCheckupDateFilter(e.target.value)}
          maxW={{ base: '100%', lg: '200px' }}
        />
        <Select
          placeholder='Filter by Illness'
          value={illnessFilter}
          onChange={(e) => setIllnessFilter(e.target.value)}
          maxW={{ base: '100%', lg: '200px' }}
        >
          {illnesses.map((illness) => (
            <option key={illness} value={illness}>
              {illness}
            </option>
          ))}
        </Select>
        <NewCheckup setMedicalCheckups={setMedicalCheckups} />
      </Stack>

      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table variant='simple'>
          <TableCaption>List of Medical Checkups</TableCaption>
          <Thead>
            <Tr>
              <Th>Cow ID</Th>
              <Th>Checkup Date</Th>
              <Th>Illness</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentCheckups?.map((checkup) => (
              <CheckupRow
                key={checkup.id}
                checkup={checkup}
                setMedicalCheckups={setMedicalCheckups}
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
        {currentCheckups?.map((checkup) => (
          <CheckupCard
            key={checkup.id}
            checkup={checkup}
            setMedicalCheckups={setMedicalCheckups}
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
          Showing {indexOfFirstCheckup + 1} to{' '}
          {Math.min(indexOfLastCheckup, filteredCheckups?.length)} of{' '}
          {filteredCheckups?.length} Checkups
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
                  Math.ceil(filteredCheckups?.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastCheckup >= filteredCheckups?.length}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default MedicalCheckups;
