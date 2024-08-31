import {
  Box,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const { data } = useFetch(`/cows/${id}`);

  console.log(id);

  return (
    <Box
      margin='auto'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={4}
      maxW='lg'
    >
      <VStack align='stretch' spacing={4}>
        <Heading size='lg'>{`Cow ${data?.cow.id}`}</Heading>

        <Box>
          <Text>
            <strong>Entry Date:</strong> {data?.cow.entryDate}
          </Text>
          <Text>
            <strong>Breed:</strong> {data?.cow.breed}
          </Text>
        </Box>

        <Accordion defaultIndex={[0, 1]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <strong>Births</strong>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant='simple' size='sm'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.cow.births.map((birth) => (
                    <Tr key={birth.id}>
                      <Td>{birth.id}</Td>
                      <Td>{birth.birthDate}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <strong>Medical Checkups</strong>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant='simple' size='sm'>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Illness/Reason</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.cow.medicalCheckups.map((checkup) => (
                    <Tr key={checkup.id}>
                      <Td>{checkup.checkupDate}</Td>
                      <Td>{checkup.illness}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Details;
