import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

const useError = () => {
  const [error, setError] = useState(null);
  const toast = useToast();
  const handleError = (error, title) => {
    setError(error);
    toast({
      title: title,
      description:
        typeof error.message === 'object'
          ? error?.response.data.message[0]
          : error.response.data.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  return { error, handleError };
};

export default useError;
