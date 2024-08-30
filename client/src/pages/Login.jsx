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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', { email, password });
    toast({
      title: 'Login Attempt',
      description: 'Login functionality not implemented yet.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
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

            <Button type='submit' colorScheme='blue' width='full' mt={5}>
              Log In
            </Button>
          </VStack>
        </form>

        <Text textAlign='center'>
          Forgot your password?{' '}
          <Link color='blue.500' href='#'>
            Reset it here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
