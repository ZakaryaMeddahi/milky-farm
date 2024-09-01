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
  birthDate: z.string().min(10, 'Birth Date is required'),
  motherCowId: z.string().min(1, 'Cow ID is required'),
});

function NewBirth({ setBirths }) {
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
      const { birthDate, motherCowId } = data;
      const response = await axiosInstance.post(
        `/cows/${motherCowId || cowsData?.cows[0].id}/births`,
        {
          birthDate,
        }
      );
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>New birth</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl isInvalid={errors.birthDate}>
                  <FormLabel htmlFor='birth-date'>Birth Date</FormLabel>
                  <Input
                    type='date'
                    id='birth-date'
                    placeholder='Enter cow birth date'
                    {...register('birthDate')}
                  />
                  <FormErrorMessage>
                    {errors.birthDate?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.motherCowId}>
                  <FormLabel htmlFor='mother-cow'>Select mother cow</FormLabel>
                  <Select id='mother-cow' {...register('motherCowId')}>
                    {cowsData?.cows.map((cow) => (
                      <option key={cow.id} value={cow.id}>
                        {cow.id}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.motherCowId?.message}
                  </FormErrorMessage>
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
