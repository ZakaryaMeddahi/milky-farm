import { Td, Tr } from '@chakra-ui/react';
import UpdateCheckup from './UpdateCheckup';
import DeleteCheckup from './DeleteCheckup';

const CheckupRow = ({ checkup, setMedicalCheckups }) => {
  return (
    <Tr key={checkup.id}>
      <Td>{checkup.cowId}</Td>
      <Td>{checkup.checkupDate}</Td>
      <Td>{checkup.illness}</Td>
      <Td display='flex' gap={2}>
        <UpdateCheckup
          id={checkup.id}
          cowId={checkup.cowId}
          setMedicalCheckups={setMedicalCheckups}
        />
        <DeleteCheckup
          id={checkup.id}
          cowId={checkup.cowId}
          setMedicalCheckups={setMedicalCheckups}
        />
      </Td>
    </Tr>
  );
};
export default CheckupRow;
