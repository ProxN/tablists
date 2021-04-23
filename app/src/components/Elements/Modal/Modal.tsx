import { useState } from 'react';
import Button from '../Button';
import Icon from '../Icon';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
} from './Modal.styles';

interface ModalProps {
  body: React.ReactNode | string;
  title: string;
  closeModal?: () => void;
  handler: () => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ body, title, closeModal, handler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await handler();
    setIsLoading(false);
  };
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          {title}
          <CloseButton onClick={closeModal}>
            <Icon name='close' />
          </CloseButton>
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} status='default' outline>
            Cancal
          </Button>
          <Button loading={isLoading} onClick={handleClick} status='danger'>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
