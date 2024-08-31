import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    navigate('/login');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box h='100%' display='flex' justifyContent='center' alignItems='center'>
      logging out...
    </Box>
  );
};

export default Logout;
