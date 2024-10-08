import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UpdateCow from './UpdateCow';
import DeleteCow from './DeleteCow';

const CowRow = ({ cow, setCows }) => {
  const navigate = useNavigate();

  return (
    <Tr key={cow.id}>
      <Td>{cow.id}</Td>
      <Td>{cow.entryDate}</Td>
      <Td>{cow.breed}</Td>
      <Td>{cow.birthsCounter}</Td>
      <Td display='flex' justifyContent='center' gap={2}>
        <IconButton
          colorScheme='purple'
          size='sm'
          aria-label='View cow'
          icon={<ViewIcon />}
          onClick={() => navigate(`/cow-details/${cow.id}`)}
        />
        <UpdateCow id={cow.id} setCows={setCows} />
        <DeleteCow id={cow.id} setCows={setCows} />
      </Td>
    </Tr>
  );
};

export default CowRow;
