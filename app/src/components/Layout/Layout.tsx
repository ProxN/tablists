import styled from 'styled-components';
import { useToast } from '@context/toast.context';
import Toast from '@components/Elements/Toast';
import Header from './Header';

const Wrapper = styled.main``;

const Layout: React.FC = ({ children }) => {
  const { toast, setToast } = useToast();
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
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
