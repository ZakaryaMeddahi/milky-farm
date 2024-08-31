import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Fallback from './Fallback';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'moderator') {
      navigate('/login');
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return user?.role === 'admin' ? children : <Fallback />;
};

export default AuthWrapper;
