import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.main``;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
