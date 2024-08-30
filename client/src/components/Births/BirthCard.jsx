import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Box, IconButton, Stack, Text, VStack } from '@chakra-ui/react';

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
      <IconButton
        colorScheme='green'
        size='sm'
        ml={2}
        aria-label='Edit cow'
        icon={<EditIcon />}
      />
      <IconButton
        colorScheme='red'
        size='sm'
        ml={2}
        aria-label='Delete cow'
        icon={<DeleteIcon />}
      />
    </Stack>
  </Box>
);

export default BirthCard;
