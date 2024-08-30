import { useRef } from 'react';
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

function UpdateProd() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {};

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
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='quantity'>Quantity</FormLabel>
                  <Input id='quantity' placeholder='Enter milk quantity' />
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
