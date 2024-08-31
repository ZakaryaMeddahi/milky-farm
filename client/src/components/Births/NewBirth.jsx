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
import useFetch from '../../hooks/useFetch';
import useError from '../../hooks/useError';
import axiosInstance from '../../utils/axiosInstance';

function NewBirth({ setBirths }) {
  const { data: cowsData } = useFetch('/cows');
  const [birthDate, setBirthDate] = useState('');
  const [motherCowId, setMotherCowId] = useState('');
  const { _, handleError } = useError();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/cows/${motherCowId || cowsData?.cows[0].id}/births`, {
        birthDate,
      });
      setBirths((prevBirths) => {
        return [...prevBirths, response.data.birth];
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to create birth record.');
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
        New birth
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
            <DrawerHeader borderBottomWidth='1px'>New birth</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='birth-date'>Birth Date</FormLabel>
                  <Input
                    type='date'
                    id='birth-date'
                    placeholder='Enter cow birth date'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='mother-cow'>Select mother cow</FormLabel>
                  <Select
                    id='mother-cow'
                    value={motherCowId}
                    onChange={(e) => setMotherCowId(e.target.value)}
                  >
                    {cowsData?.cows.map((cow) => (
                      <option key={cow.id} value={cow.id}>
                        {cow.id}
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

export default NewBirth;
