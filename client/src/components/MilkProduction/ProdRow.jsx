import { Td, Tr } from '@chakra-ui/react';
import UpdateProd from './UpdateProd';
import DeleteProd from './DeleteProd';

const ProdRow = ({ milkProd, setMilkProds }) => {
  return (
    <Tr key={milkProd.id}>
      <Td>{milkProd.productionDate}</Td>
      <Td>{milkProd.quantity} L</Td>
      <Td display='flex' gap={2}>
        <UpdateProd id={milkProd.id} setMilkProds={setMilkProds} />
        <DeleteProd id={milkProd.id} setMilkProds={setMilkProds} />
      </Td>
    </Tr>
  );
};
export default ProdRow;
