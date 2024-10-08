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

function UpdateCow({ id, setCows }) {
  const { _, handleError } = useError();
  const [cow, setCow] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/cows/${id}`, cow);
      setCow(response.data.cow);
      setCows((prevCows) => {
        const index = prevCows.findIndex((c) => c.id === id);
        prevCows[index] = response.data.cow;
        return [...prevCows]; // update the reference
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to update cow record.');
    }
  };

  useEffect(() => {
    const fetchCow = async () => {
      try {
        const response = await axiosInstance.get(`/cows/${id}`);
        const { cow } = response.data;
        const { births: _, medicalCheckups: __, ...cowWithoutPopulate } = cow;
        setCow(cowWithoutPopulate);
      } catch (error) {
        console.error(error);
        handleError(error, 'Unable to fetch cow record.');
      }
    };

    if (id) {
      fetchCow();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        size='sm'
        aria-label='Edit cow'
        icon={<EditIcon />}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Update cow</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='id'>ID</FormLabel>
                  <Input
                    id='id'
                    placeholder='Enter cow id'
                    value={cow?.id}
                    onChange={(e) => setCow({ ...cow, id: e.target.value })}
                    disabled
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='entry-date'>Entry Date</FormLabel>
                  <Input
                    type='date'
                    id='entry-date'
                    placeholder='Enter cow entry date'
                    value={cow?.entryDate}
                    onChange={(e) =>
                      setCow({ ...cow, entryDate: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='breed'>Select breed</FormLabel>
                  <Select
                    id='breed'
                    value={cow?.breed}
                    onChange={(e) => setCow({ ...cow, breed: e.target.value })}
                  >
                    <option value='Holstein'>Holstein</option>
                    <option value='Montebiliarde'>Montebiliarde</option>
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

export default UpdateCow;
