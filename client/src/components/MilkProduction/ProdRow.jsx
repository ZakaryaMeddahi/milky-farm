import { Td, Tr } from '@chakra-ui/react';
import UpdateProd from './UpdateProd';
import DeleteProd from './DeleteProd';

const ProdRow = ({ milkProd }) => {
  return (
    <Tr key={milkProd.id}>
      <Td>{milkProd.productionDate}</Td>
      <Td>{milkProd.quantity}</Td>
      <Td display='flex' gap={2}>
        <UpdateProd />
        <DeleteProd />
      </Td>
    </Tr>
  );
};
export default ProdRow;
