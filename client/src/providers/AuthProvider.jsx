import { useState, createContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      error.message = error.response?.data?.message || error.message;
      console.error(`Login Error: ${error.message}`);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.error('User not found: ', error);
        if (error.code === 'ERR_NETWORK') {
          setUser({ error: error.code });
        }
      }
    };

    if (location.pathname !== '/login' && location.pathname !== '/logout') {
      checkUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
