import { useNavigate } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';
import { Badge, Box, IconButton, Stack, Text, VStack } from '@chakra-ui/react';
import UpdateCow from './UpdateCow';
import DeleteCow from './DeleteCow';

const CowCard = ({ cow, setCows }) => {
  const navigate = useNavigate();

  return (
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
          Births: <span style={{ fontWeight: 'normal' }}>{cow.birthsCounter}</span>
        </Text>
      </VStack>
      <Stack justifyContent='center'>
        <IconButton
          colorScheme='purple'
          size='sm'
          aria-label='View cow'
          icon={<ViewIcon />}
          onClick={() => navigate(`/cow-details/${cow.id}`)}
        />
        <UpdateCow id={cow.id} setCows={setCows} />
        <DeleteCow id={cow.id} setCows={setCows} />
      </Stack>
    </Box>
  );
};

export default CowCard;
