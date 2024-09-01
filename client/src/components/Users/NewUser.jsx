import { useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import useError from '../../hooks/useError';
import axiosInstance from '../../utils/axiosInstance';
import { ROLES } from '../../config/constants';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['moderator', 'admin']),
});

function NewUser({ setUsers }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { _, handleError } = useError();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const onSubmit = async (data) => {
    try {
      const { name, email, role } = data;
      const response = await axiosInstance.post('/users', {
        name,
        email,
        role,
      });
      setUsers((prevUsers) => {
        return [...prevUsers, response.data.user];
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to create user record.');
    }
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        minW={{ base: '100%', md: '300px' }}
        colorScheme='blue'
        onClick={onOpen}
      >
        New User
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>New User</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    ref={firstField}
                    id='name'
                    placeholder='Enter user name'
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    placeholder='Enter user email'
                    {...register('email')}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.role}>
                  <FormLabel htmlFor='role'>Select role</FormLabel>
                  <Select id='role' {...register('role')}>
                    {ROLES.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter
              display='flex'
              flexDir='column'
              gap={4}
              borderTopWidth='1px'
            >
              <Button w='100%' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' w='100%' colorScheme='blue'>
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

export default NewUser;
