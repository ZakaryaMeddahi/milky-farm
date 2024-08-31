import { useRef, useState } from 'react';
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
  FormLabel,
  Input,
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import useError from '../../hooks/useError';
import axiosInstance from '../../utils/axiosInstance';

function NewCow({ setCows }) {
  const [id, setId] = useState(100);
  const [entryDate, setEntryDate] = useState('');
  const [breed, setBreed] = useState('Holstein');
  const { _, handleError } = useError();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/cows', {
        id,
        entryDate,
        breed,
      });
      setCows((prevCows) => {
        return [...prevCows, response.data.cow];
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to create cow record.');
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
        New cow
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>New cow</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='id'>ID</FormLabel>
                  <Input
                    ref={firstField}
                    id='id'
                    placeholder='Enter cow id'
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='entry-date'>Entry Date</FormLabel>
                  <Input
                    type='date'
                    id='entry-date'
                    placeholder='Enter cow entry date'
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='breed'>Select breed</FormLabel>
                  <Select
                    id='breed'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
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

export default NewCow;