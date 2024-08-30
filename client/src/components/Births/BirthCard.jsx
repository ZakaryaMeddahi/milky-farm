import { Badge, Box, Stack, Text, VStack } from '@chakra-ui/react';
import UpdateBirth from './UpdateBirth';
import DeleteBirth from './DeleteBirth';

const BirthCard = ({ birth }) => (
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
        ID: {birth.id}
      </Badge>
      <Text fontWeight='bold'>
        Birth Date:{' '}
        <span style={{ fontWeight: 'normal' }}>{birth.birthDate}</span>
      </Text>
      <Text fontWeight='bold'>
        Mother ID:{' '}
        <span style={{ fontWeight: 'normal' }}>{birth.motherCowId}</span>
      </Text>
    </VStack>
    <Stack justifyContent='center'>
      <UpdateBirth />
      <DeleteBirth />
    </Stack>
  </Box>
);

export default BirthCard;
