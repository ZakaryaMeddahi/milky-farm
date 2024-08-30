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
  Select,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';

function UpdateBirth() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleSubmit = async (e) => {};

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
                  <Input type='date' id='birth-date' placeholder='Enter cow birth date' />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='mother-cow'>Select mother cow</FormLabel>
                  <Select id='mother-cow' defaultValue='Holstein'>
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

export default UpdateBirth;
