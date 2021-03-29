import styled, { css } from 'styled-components';
import LogoSVG from '@assets/logo.svg';
import Input from '@components/Input';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.bg.main};
  height: 7rem;
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  height: 100%;
  max-width: 100rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
`;

const Logo = styled.a`
  cursor: pointer;
  user-select: none;
  display: flex;
`;

const NavLinks = styled.ul`
  display: flex;
`;

const NavLink = styled.a`
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  user-select: none;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
  :hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
`;

const AuthLink = styled(NavLink)`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    color: ${theme.colors.invertText};
    border-radius: ${theme.borderRadius / 3}px;
    :hover {
      color: ${theme.colors.invertText};
    }
  `};
  padding: 0.6rem 1.2rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <LogoSVG />
        </Logo>
        <NavLinks>
          <li>
            <NavLink>Movies</NavLink>
          </li>
          <li>
            <NavLink>Anime</NavLink>
          </li>
          <li>
            <NavLink>Books</NavLink>
          </li>
          <li>
            <NavLink>Travel</NavLink>
          </li>
          <li>
            <NavLink>Other</NavLink>
          </li>
        </NavLinks>
        <form>
          <Input placeholder='Search for lists' icon='search' right />
        </form>
        <div>
          <AuthLinks>
            <NavLink>Sign in</NavLink>
            <AuthLink>Sign up</AuthLink>
          </AuthLinks>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
