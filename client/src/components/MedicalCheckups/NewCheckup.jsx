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
import useFetch from '../../hooks/useFetch';
import useError from '../../hooks/useError';
import axiosInstance from '../../utils/axiosInstance';

const formSchema = z.object({
  checkupDate: z.string().min(10, 'Checkup Date is required'),
  illness: z.string().min(3, 'Illness must be at least 3 characters long'),
  cowId: z.string().min(1, 'Cow ID is required'),
});

function NewCheckup({ setMedicalCheckups }) {
  const { data: cowsData } = useFetch('/cows');
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
      const { checkupDate, illness, cowId } = data;
      const response = await axiosInstance.post(
        `/cows/${cowId || cowsData?.cows[0].id}/medical-checkups`,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              New Medical Checkup
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl isInvalid={errors.checkupDate}>
                  <FormLabel htmlFor='checkup-date'>Checkup Date</FormLabel>
                  <Input
                    type='date'
                    id='checkup-date'
                    placeholder='Enter cow checkup date'
                    {...register('checkupDate')}
                  />
                  <FormErrorMessage>
                    {errors.checkupDate?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.illness}>
                  <FormLabel htmlFor='illness'>Illness</FormLabel>
                  <Input
                    id='illness'
                    placeholder="Enter cow's illness"
                    {...register('illness')}
                  />
                  <FormErrorMessage>{errors.illness?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.cowId}>
                  <FormLabel htmlFor='cow'>Select cow</FormLabel>
                  <Select id='cow' {...register('cowId')}>
                    {cowsData?.cows.map((cow) => (
                      <option key={cow.id} value={cow.id}>
                        {cow.id}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.cowId?.message}</FormErrorMessage>
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
