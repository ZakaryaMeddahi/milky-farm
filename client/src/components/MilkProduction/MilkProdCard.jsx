import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Stack, Text, VStack } from '@chakra-ui/react';

const MilkProdCard = ({ milkProd }) => (
  <Box
    display='flex'
    justifyContent='space-between'
    borderWidth='1px'
    borderRadius='lg'
    p={4}
    shadow='md'
  >
    <VStack align='start' spacing={2}>
      <Text fontWeight='bold'>
        Production Date:{' '}
        <span style={{ fontWeight: 'normal' }}>{milkProd.productionDate}</span>
      </Text>
      <Text fontWeight='bold'>
        Quantity:{' '}
        <span style={{ fontWeight: 'normal' }}>{milkProd.quantity}</span>
      </Text>
    </VStack>
    <Stack justifyContent='center'>
      <IconButton
        colorScheme='green'
        size='sm'
        ml={2}
        aria-label='Edit milk production'
        icon={<EditIcon />}
      />
      <IconButton
        colorScheme='red'
        size='sm'
        ml={2}
        aria-label='Delete production'
        icon={<DeleteIcon />}
      />
    </Stack>
  </Box>
);

export default MilkProdCard;