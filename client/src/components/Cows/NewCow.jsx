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

const formSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  entryDate: z.string().min(10, 'Entry is required'),
  breed: z.enum(['Holstein', 'Montebiliarde']),
});

function NewCow({ setCows }) {
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
      const { id, entryDate, breed } = data;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>New cow</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl isInvalid={errors.id}>
                  <FormLabel htmlFor='id'>ID</FormLabel>
                  <Input
                    ref={firstField}
                    id='id'
                    type='number'
                    placeholder='Enter cow id'
                    {...register('id')}
                  />
                  <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.entryDate}>
                  <FormLabel htmlFor='entry-date'>Entry Date</FormLabel>
                  <Input
                    type='date'
                    id='entry-date'
                    placeholder='Enter cow entry date'
                    {...register('entryDate')}
                  />
                  <FormErrorMessage>
                    {errors.entryDate?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.breed?.message}>
                  <FormLabel htmlFor='breed'>Select breed</FormLabel>
                  <Select id='breed' {...register('breed')}>
                    <option value='Holstein'>Holstein</option>
                    <option value='Montebiliarde'>Montebiliarde</option>
                  </Select>
                  <FormErrorMessage>{errors.breed?.message}</FormErrorMessage>
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
