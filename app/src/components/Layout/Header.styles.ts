import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.bg.main};
  height: 7rem;
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  height: 100%;
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
`;

export const Logo = styled.a`
  cursor: pointer;
  user-select: none;
  display: flex;
`;

export const NavLinks = styled.ul`
  display: flex;
`;

export const NavLink = styled.a`
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  user-select: none;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
  :hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthLink = styled(NavLink)`
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

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-weight: 500;
  }
  div:first-child {
    margin-right: 1rem;
  }
`;
