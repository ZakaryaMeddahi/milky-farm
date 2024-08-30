import { ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Badge, Box, IconButton, Stack, Text, VStack } from '@chakra-ui/react';

const CowCard = ({ cow }) => (
  <Box
    display='flex'
    justifyContent='space-between'
    borderWidth='1px'
    borderRadius='lg'
    p={4}
    shadow='md'
  >
    <VStack align='start' spacing={2}>
      <Badge colorScheme='purple' p={1}>
        ID: {cow.id}
      </Badge>
      <Text fontWeight='bold'>
        Entry Date:{' '}
        <span style={{ fontWeight: 'normal' }}>{cow.entryDate}</span>
      </Text>
      <Text fontWeight='bold'>
        Breed: <span style={{ fontWeight: 'normal' }}>{cow.breed}</span>
      </Text>
      <Text fontWeight='bold'>
        Births: <span style={{ fontWeight: 'normal' }}>{cow.births}</span>
      </Text>
    </VStack>
    <Stack justifyContent='center'>
      <IconButton
        colorScheme='purple'
        size='sm'
        aria-label='View cow'
        icon={<ViewIcon />}
      />
      <IconButton
        colorScheme='green'
        size='sm'
        aria-label='Edit cow'
        icon={<EditIcon />}
      />
      <IconButton
        colorScheme='red'
        size='sm'
        aria-label='Delete cow'
        icon={<DeleteIcon />}
      />
    </Stack>
  </Box>
);

export default CowCard;
