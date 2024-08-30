import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import UpdateProd from './UpdateProd';
import DeleteProd from './DeleteProd';

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
      <UpdateProd />
      <DeleteProd />
    </Stack>
  </Box>
);

export default MilkProdCard;
