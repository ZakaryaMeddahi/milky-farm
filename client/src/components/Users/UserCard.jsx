import { Badge, Box, Stack, Text, VStack } from '@chakra-ui/react';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const UserCard = ({ user, setUsers }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      shadow='md'
    >
      <VStack align='start' spacing={2}>
        <Badge colorScheme='purple' p={1}>
          ID: {user.id}
        </Badge>
        <Text fontWeight='bold'>
          Name: <span style={{ fontWeight: 'normal' }}>{user.name}</span>
        </Text>
        <Text fontWeight='bold'>
          Email: <span style={{ fontWeight: 'normal' }}>{user.email}</span>
        </Text>
        <Text fontWeight='bold'>
          Role: <span style={{ fontWeight: 'normal' }}>{user.role}</span>
        </Text>
      </VStack>
      <Stack justifyContent='center'>
        <UpdateUser id={user.id} setUsers={setUsers} />
        <DeleteUser id={user.id} setUsers={setUsers} />
      </Stack>
    </Box>
  );
};

export default UserCard;
