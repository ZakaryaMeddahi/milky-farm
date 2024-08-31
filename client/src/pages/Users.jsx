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
  Select,
  Button,
  SimpleGrid,
  Text,
  HStack,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ROLES } from '../config/constants';
import UserCard from '../components/Users/UserCard';
import UserRow from '../components/Users/UserRow';
import NewUser from '../components/Users/NewUser';
import useFetch from '../hooks/useFetch';

const Users = () => {
  const { data } = useFetch('/users');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredUsers = users?.filter(
    (user) =>
      (roleFilter === '' || user.role === roleFilter) &&
      (searchTerm === '' ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    setUsers(data?.users);
  }, [data]);

  return (
    <Box>
      <Heading as='h2' size='lg' mb={6}>
        Users
      </Heading>

      <Stack spacing={4} mb={6} flexDir={{ base: 'column', md: 'row' }}>
        <Input
          placeholder='Search by user name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          w='100%'
        />
        <Select
          placeholder='Filter by role'
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          w='100%'
        >
          {ROLES.map((breed) => (
            <option key={breed.id} value={breed.name}>
              {breed.name}
            </option>
          ))}
        </Select>
        <NewUser setUsers={setUsers} />
      </Stack>

      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table variant='simple'>
          <TableCaption>List of Cows</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>role</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers?.map((user) => (
              <UserRow key={user.id} user={user} setUsers={setUsers} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <SimpleGrid
        display={{ base: 'grid', md: 'none' }}
        columns={1}
        spacing={4}
      >
        {currentUsers?.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </SimpleGrid>

      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        mt={6}
      >
        <Text>
          Showing {indexOfFirstUser + 1} to{' '}
          {Math.min(indexOfLastUser, filteredUsers?.length)} of{' '}
          {filteredUsers?.length} users
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
                  Math.ceil(filteredUsers?.length / itemsPerPage)
                )
              )
            }
            disabled={indexOfLastUser >= filteredUsers?.length}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Users;
