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

function UpdateCheckup({ id, cowId, setMedicalCheckups }) {
  const { data: cowsData } = useFetch('/cows');
  const { _, handleError } = useError();
  const [medicalCheckup, setMedicalCheckup] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/cows/${cowId}/medical-checkups/${id}`,
        medicalCheckup
      );
      setMedicalCheckup(response.data.medicalCheckup);
      setMedicalCheckups((prevMedicalCheckups) => {
        const index = prevMedicalCheckups.findIndex((m) => m.id === id);
        prevMedicalCheckups[index] = response.data.medicalCheckup;
        return [...prevMedicalCheckups]; // update the reference
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to update medical checkup record.');
    }
  };

  useEffect(() => {
    const fetchMedicalCheckup = async () => {
      try {
        const response = await axiosInstance.get(
          `/cows/${cowId}/medical-checkups/${id}`
        );
        const { medicalCheckup } = response.data;
        setMedicalCheckup(medicalCheckup);
      } catch (error) {
        console.error(error);
        handleError(error, 'Unable to fetch medical checkup record.');
      }
    };

    if (id && cowId) {
      fetchMedicalCheckup();
    }
  }, [id, cowId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        size='sm'
        aria-label='Edit medical checkup'
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
            <DrawerHeader borderBottomWidth='1px'>
              Update Medical Checkup
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='birth-date'>Checkup Date</FormLabel>
                  <Input
                    type='date'
                    id='birth-date'
                    placeholder='Enter cow birth date'
                    value={medicalCheckup?.checkupDate}
                    onChange={(e) =>
                      setMedicalCheckup({
                        ...medicalCheckup,
                        checkupDate: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='illness'>Illness</FormLabel>
                  <Input
                    id='illness'
                    placeholder="Enter cow's illness"
                    value={medicalCheckup?.illness}
                    onChange={(e) =>
                      setMedicalCheckup({
                        ...medicalCheckup,
                        illness: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='cow'>Select cow</FormLabel>
                  <Select
                    id='cow'
                    value={medicalCheckup?.cowId}
                    onChange={(e) =>
                      setMedicalCheckup({
                        ...medicalCheckup,
                        cowId: e.target.value,
                      })
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

export default UpdateCheckup;
