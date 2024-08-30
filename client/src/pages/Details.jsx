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

// Mock data for demonstration
const cowData = {
  id: 1,
  entryDate: '2022-03-15',
  breed: 'Holstein',
  births: [
    { id: 1, date: '2023-04-10' },
    { id: 2, date: '2024-05-20' },
  ],
  medicalCheckups: [
    { id: 1, date: '2023-01-15', illness: 'Routine checkup' },
    { id: 2, date: '2023-06-20', illness: 'Mild fever' },
    { id: 3, date: '2024-02-10', illness: 'Vaccination' },
  ],
};

const Details = () => {
  return (
    <Box margin='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} maxW="lg">
      <VStack align="stretch" spacing={4}>
        <Heading size="lg">{`Cow ${cowData.id}`}</Heading>
        
        <Box>
          <Text><strong>Entry Date:</strong> {cowData.entryDate}</Text>
          <Text><strong>Breed:</strong> {cowData.breed}</Text>
        </Box>

        <Accordion defaultIndex={[0, 1]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <strong>Births</strong>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cowData.births.map((birth) => (
                    <Tr key={birth.id}>
                      <Td>{birth.id}</Td>
                      <Td>{birth.date}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <strong>Medical Checkups</strong>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Illness/Reason</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cowData.medicalCheckups.map((checkup) => (
                    <Tr key={checkup.id}>
                      <Td>{checkup.date}</Td>
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