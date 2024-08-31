import { useEffect, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
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
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/axiosInstance';
import useError from '../../hooks/useError';
import { ROLES } from '../../config/constants';

function UpdateUser({ id, setUsers }) {
  const { _, handleError } = useError();
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/users/${id}`, user);
      setUser(response.data.user);
      setUsers((prevUsers) => {
        const index = prevUsers.findIndex((c) => c.id === id);
        prevUsers[index] = response.data.user;
        return [...prevUsers]; // update the reference
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to update user record.');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.error(error);
        handleError(error, 'Unable to fetch user record.');
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        size='sm'
        aria-label='Edit user'
        icon={<EditIcon />}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Update user</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    id='name'
                    placeholder='Enter user name'
                    value={user?.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    placeholder='Enter email'
                    value={user?.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='role'>Select role</FormLabel>
                  <Select
                    id='role'
                    value={user?.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    {ROLES.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </Select>
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

export default UpdateUser;
