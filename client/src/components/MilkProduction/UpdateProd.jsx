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
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/axiosInstance';
import useError from '../../hooks/useError';

function UpdateProd({ id, setMilkProds }) {
  const { _, handleError } = useError();
  const [milkProd, setMilkProd] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/milk-production/${id}`,
        milkProd
      );
      setMilkProd(response.data.milkProduction);
      setMilkProds((prevMilkProds) => {
        const index = prevMilkProds.findIndex((prod) => prod.id === id);
        prevMilkProds[index] = response.data.milkProduction;
        return [...prevMilkProds]; // update the reference
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to update production record.');
    }
  };

  useEffect(() => {
    const fetchMilkProd = async () => {
      try {
        const response = await axiosInstance.get(`/milk-production/${id}`);
        const { milkProduction } = response.data;
        setMilkProd(milkProduction);
      } catch (error) {
        console.error(error);
        handleError(error, 'Unable to fetch production record.');
      }
    };

    if (id) {
      fetchMilkProd();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='green'
        size='sm'
        ml={2}
        aria-label='Edit milk production'
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
              Update Production
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='production-date'>
                    Production Date
                  </FormLabel>
                  <Input
                    type='date'
                    id='production-date'
                    placeholder='Enter cow production date'
                    value={milkProd?.productionDate}
                    onChange={(e) =>
                      setMilkProd({
                        ...milkProd,
                        productionDate: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='quantity'>Quantity</FormLabel>
                  <Input
                    id='quantity'
                    placeholder='Enter milk quantity'
                    value={milkProd?.quantity}
                    onChange={(e) =>
                      setMilkProd({ ...milkProd, quantity: e.target.value })
                    }
                  />
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

export default UpdateProd;
