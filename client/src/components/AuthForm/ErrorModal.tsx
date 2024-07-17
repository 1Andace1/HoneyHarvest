import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import styles from './ErrorModal.module.css'; // Импортируем стили

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, error }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxWidth="400px"
        margin="auto"
        padding="20px"
        backgroundColor="#ffffff"
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      >
        <ModalHeader className={styles.errorModalTitle}>
          Ошибка
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p className={styles.errorModalMessage}>{error}</p>{' '}
        
        </ModalBody>
        <ModalFooter>
          <Button className={styles.errorModalButton} onClick={onClose}>
     
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
