import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Box, IconButton, Stack, Text, VStack } from '@chakra-ui/react';

const CheckupCard = ({ checkup }) => (
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
      <IconButton
        colorScheme='green'
        size='sm'
        aria-label='Edit medical checkup'
        icon={<EditIcon />}
      />
      <IconButton
        colorScheme='red'
        size='sm'
        aria-label='Delete medical checkup'
        icon={<DeleteIcon />}
      />
    </Stack>
  </Box>
);

export default CheckupCard;
