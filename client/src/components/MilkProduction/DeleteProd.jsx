import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axiosInstance from '../../utils/axiosInstance';
import useError from '../../hooks/useError';

function DeleteProd({ id, setMilkProds }) {
  const [loading, setLoading] = useState(false);
  const { _, handleError } = useError();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/milk-production/${id}`);
      setMilkProds((prevMilkProds) => {
        return prevMilkProds.filter((prod) => prod.id !== id);
      });
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error, 'Unable to delete production record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme='red'
        size='sm'
        aria-label='Delete cow'
        icon={<DeleteIcon />}
      />

      <AlertDialog
        motionPreset='slideInBottom'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Production Record
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                loadingText='Deleting'
                colorScheme='red'
                onClick={handleSubmit}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteProd;
