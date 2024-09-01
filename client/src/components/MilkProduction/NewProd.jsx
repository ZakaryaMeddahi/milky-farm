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
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import useError from '../../hooks/useError';
import axiosInstance from '../../utils/axiosInstance';

const formSchema = z.object({
  productionDate: z.string().min(10, 'Production Date is required'),
  quantity: z.string().min(1, 'Quantity is required'),
});

function NewProd({ setMilkProds }) {
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
      const { productionDate, quantity } = data;
      const response = await axiosInstance.post('/milk-production', {
        productionDate,
        quantity,
      });
      setMilkProds((prevMilkProds) => {
        return [...prevMilkProds, response.data.milkProduction];
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to create production record.');
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
        New Production
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
            <DrawerHeader borderBottomWidth='1px'>New Production</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl isInvalid={errors.productionDate}>
                  <FormLabel htmlFor='production-date'>
                    Production Date
                  </FormLabel>
                  <Input
                    type='date'
                    id='production-date'
                    placeholder='Enter production date'
                    {...register('productionDate')}
                  />
                  <FormErrorMessage>
                    {errors.productionDate?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.quantity}>
                  <FormLabel htmlFor='quantity'>Quantity</FormLabel>
                  <Input
                    id='quantity'
                    placeholder='Enter milk quantity'
                    {...register('quantity')}
                  />
                  <FormErrorMessage>
                    {errors.quantity?.message}
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

export default NewProd;
