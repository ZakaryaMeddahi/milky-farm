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

function NewCheckup({ setMedicalCheckups }) {
  const { data: cowsData } = useFetch('/cows');
  const [checkupDate, setCheckupDate] = useState('');
  const [illness, setIllness] = useState('');
  const [cowId, setCowId] = useState('');
  const { _, handleError } = useError();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/cows/${cowId}/medical-checkups`,
        {
          checkupDate,
          illness,
        }
      );
      setMedicalCheckups((prevMedicalCheckups) => {
        return [...prevMedicalCheckups, response.data.medicalCheckup];
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to create medical checkup record.');
    }
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        minW={{ base: '100%', lg: '300px' }}
        colorScheme='blue'
        onClick={onOpen}
      >
        New Medical Checkup
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
            <DrawerHeader borderBottomWidth='1px'>
              New Medical Checkup
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='checkup-date'>Checkup Date</FormLabel>
                  <Input
                    type='date'
                    id='checkup-date'
                    placeholder='Enter cow checkup date'
                    value={checkupDate}
                    onChange={(e) => setCheckupDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='illness'>Illness</FormLabel>
                  <Input
                    id='illness'
                    placeholder="Enter cow's illness"
                    value={illness}
                    onChange={(e) => setIllness(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='cow'>Select cow</FormLabel>
                  <Select
                    id='cow'
                    value={cowId}
                    onChange={(e) => setCowId(e.target.value)}
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

export default NewCheckup;
