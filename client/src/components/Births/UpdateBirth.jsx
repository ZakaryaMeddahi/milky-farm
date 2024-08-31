import { useEffect, useRef, useState } from 'react';
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
import useFetch from '../../hooks/useFetch';
import axiosInstance from '../../utils/axiosInstance';
import useError from '../../hooks/useError';

function UpdateBirth({ id, motherCowId, setBirths }) {
  const { data: cowsData } = useFetch('/cows');
  const { _, handleError } = useError();
  const [birth, setBirth] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/cows/${motherCowId}/births/${id}`,
        birth
      );
      setBirth(response.data.birth);
      setBirths((prevBirth) => {
        const index = prevBirth.findIndex((b) => b.id === id);
        prevBirth[index] = response.data.birth;
        return [...prevBirth]; // update the reference
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to update birth record.');
    }
  };

  useEffect(() => {
    const fetchBirth = async () => {
      try {
        const response = await axiosInstance.get(
          `/cows/${motherCowId}/births/${id}`
        );
        const { birth } = response.data;
        setBirth(birth);
      } catch (error) {
        console.error(error);
        handleError(error, 'Unable to fetch birth record.');
      }
    };

    if (id && motherCowId) {
      fetchBirth();
    }
  }, [id, motherCowId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        size='sm'
        aria-label='Edit birth'
        icon={<EditIcon />}
      />
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
            <DrawerHeader borderBottomWidth='1px'>Update birth</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='birth-date'>Birth Date</FormLabel>
                  <Input
                    type='date'
                    id='birth-date'
                    placeholder='Enter cow birth date'
                    value={birth?.birthDate}
                    onChange={(e) =>
                      setBirth({ ...birth, birthDate: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='mother-cow'>Select mother cow</FormLabel>
                  <Select
                    id='mother-cow'
                    value={birth?.motherCowId}
                    onChange={(e) =>
                      setBirth({ ...birth, motherCowId: e.target.value })
                    }
                    disabled
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

export default UpdateBirth;
