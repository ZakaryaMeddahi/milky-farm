import { Badge, Box, Stack, Text, VStack } from '@chakra-ui/react';
import UpdateCheckup from './UpdateCheckup';
import DeleteCheckup from './DeleteCheckup';

const CheckupCard = ({ checkup, setMedicalCheckups }) => (
  <Box
    display='flex'
    justifyContent='space-between'
    borderWidth='1px'
    borderRadius='lg'
    p={4}
    shadow='md'
  >
    <VStack align='start' spacing={2}>
      <Badge colorScheme='purple' px={2} py={1}>
        COW ID: {checkup.cowId}
      </Badge>
      <Text fontWeight='bold'>
        Checkup Date:{' '}
        <span style={{ fontWeight: 'normal' }}>{checkup.checkupDate}</span>
      </Text>
      <Text fontWeight='bold'>
        Illness: <span style={{ fontWeight: 'normal' }}>{checkup.illness}</span>
      </Text>
    </VStack>
    <Stack justifyContent='center'>
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
    </Stack>
  </Box>
);

export default CheckupCard;
