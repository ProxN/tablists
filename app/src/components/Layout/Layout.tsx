import styled from 'styled-components';
import { useToast } from '@context/toast.context';
import useModalState from '@hooks/useModalState';
import Toast from '@components/Elements/Toast';
import Modal from '@components/Elements/Modal';
import Header from './Header';

const Wrapper = styled.main``;

const Layout: React.FC = ({ children }) => {
  const { toast, setToast } = useToast();
  const { isModalOpen, modal, closeModal } = useModalState();
  return (
    <>
      <Header />
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      {isModalOpen && modal && (
        <>
          <style jsx global>{`
            body {
              height: 100vh;
              overflow: hidden;
            }
          `}</style>
          <Modal
            closeModal={closeModal}
            body={modal.body}
            handler={modal.props.handler}
            title={modal.props.title}
          />
        </>
      )}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
