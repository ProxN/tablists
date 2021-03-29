import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.main`
  height: 100%;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
