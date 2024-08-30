import { Td, Tr } from "@chakra-ui/react";
import UpdateBirth from "./UpdateBirth";
import DeleteBirth from "./DeleteBirth";

const BirthRow = ({birth}) => {
  return (
    <Tr key={birth.id}>
      <Td>{birth.id}</Td>
      <Td>{birth.birthDate}</Td>
      <Td>{birth.motherCowId}</Td>
      <Td display='flex' gap={2}>
        <UpdateBirth />
        <DeleteBirth />
      </Td>
    </Tr>
  );
};
export default BirthRow;
