import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import logo from '/milky-farm.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(16, 'Password must be at most 16 characters'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                {...register('password')}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
