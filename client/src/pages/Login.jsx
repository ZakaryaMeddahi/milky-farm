import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  useToast,
  Image,
} from '@chakra-ui/react';
import logo from '/milky-farm.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description:
          typeof error.message === 'object' ? error.message[0] : error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      h='100%'
      w='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      px={10}
    >
      <VStack w='400px' spacing={8} align='stretch'>
        <Box
          display='flex'
          flexDir='column'
          alignItems='center'
          textAlign='center'
        >
          <Image src={logo} alt='Milky Farm' h={14} mb={2}></Image>
          <Heading as='h1' size='xl'>
            Welcome Back
          </Heading>
          <Text mt={2}>Login to Milky Farm</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
            </FormControl>

            <Button
              isLoading={isLoading}
              loadingText='Logging in'
              type='submit'
              colorScheme='blue'
              width='full'
              mt={5}
            >
              Log In
            </Button>
          </VStack>
        </form>

        {/* <Text textAlign='center'>
          Forgot your password?{' '}
          <Link color='blue.500' href='#'>
            Reset it here
          </Link>
        </Text> */}
      </VStack>
    </Box>
  );
};

export default Login;
