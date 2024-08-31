import { Td, Tr } from '@chakra-ui/react';
import UpdateBirth from './UpdateBirth';
import DeleteBirth from './DeleteBirth';

const BirthRow = ({ birth, setBirths }) => {
  return (
    <Tr key={birth.id}>
      <Td>{birth.id}</Td>
      <Td>{birth.birthDate}</Td>
      <Td>{birth.motherCowId}</Td>
      <Td display='flex' gap={2}>
        <UpdateBirth
          id={birth.id}
          motherCowId={birth.motherCowId}
          setBirths={setBirths}
        />
        <DeleteBirth
          id={birth.id}
          motherCowId={birth.motherCowId}
          setBirths={setBirths}
        />
      </Td>
    </Tr>
  );
};

export default BirthRow;
