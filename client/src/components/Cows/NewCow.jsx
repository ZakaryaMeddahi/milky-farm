import { useRef } from 'react';
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

function NewCow() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {};

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
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>New cow</DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <FormControl>
                  <FormLabel htmlFor='id'>ID</FormLabel>
                  <Input ref={firstField} id='id' placeholder='Enter cow id' />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='entry-date'>Entry Date</FormLabel>
                  <Input type='date' id='entry-date' placeholder='Enter cow entry date' />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='breed'>Select breed</FormLabel>
                  <Select id='breed' defaultValue='Holstein'>
                    <option value='Holstein'>Holstein</option>
                    <option value='Montebiliarde'>Montebiliarde</option>
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

export default NewCow;
