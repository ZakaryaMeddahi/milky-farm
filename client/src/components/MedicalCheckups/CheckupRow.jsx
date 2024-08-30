import { Td, Tr } from '@chakra-ui/react';
import UpdateCheckup from './UpdateCheckup';
import DeleteCheckup from './DeleteCheckup';

const CheckupRow = ({ checkup }) => {
  return (
    <Tr key={checkup.id}>
      <Td>{checkup.cowId}</Td>
      <Td>{checkup.checkupDate}</Td>
      <Td>{checkup.illness}</Td>
      <Td display='flex' gap={2}>
        <UpdateCheckup />
        <DeleteCheckup />
      </Td>
    </Tr>
  );
};
export default CheckupRow;
