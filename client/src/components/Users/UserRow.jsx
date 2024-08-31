import { Td, Tr } from '@chakra-ui/react';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const UserRow = ({ user, setUsers }) => {
  return (
    <Tr key={user.id}>
      <Td>{user.id}</Td>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>{user.role}</Td>
      <Td display='flex' justifyContent='center' gap={2}>
        <UpdateUser id={user.id} setUsers={setUsers} />
        <DeleteUser id={user.id} setUsers={setUsers} />
      </Td>
    </Tr>
  );
};

export default UserRow;
