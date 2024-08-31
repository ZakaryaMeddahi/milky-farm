import { Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';

const Fallback = () => {
  const { user } = useAuth();

  return (
    <Box h='500px' display='flex' justifyContent='center' alignItems='center'>
      {user?.error === 'ERR_NETWORK' ? (
        <Alert status='error'>
          <AlertIcon />
          Network Error
        </Alert>
      ) : (
        <Spinner
          h='40px'
          w='40px'
          borderWidth='3px'
          display='flex'
          alignItems='center'
        />
      )}
    </Box>
  );
};

export default Fallback;
