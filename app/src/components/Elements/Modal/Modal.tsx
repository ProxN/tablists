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
  handler?: () => void;
}

const Modal: React.FC<ModalProps> = ({ body, title, closeModal, handler }) => {
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
          <Button onClick={handler} status='danger'>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
