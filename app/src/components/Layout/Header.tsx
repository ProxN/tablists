import NextLink from 'next/link';
import { useAuth } from '@context/auth.context';
import LogoSVG from '@assets/logo.svg';
import Input from '@components/Elements/Input';
import Avatar from '@components/Elements/Avatar';
import {
  AuthLink,
  AuthLinks,
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  NavLinks,
  UserProfile,
} from './Header.styles';

const Header = () => {
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <Nav>
        <NextLink href='/'>
          <Logo>
            <LogoSVG />
          </Logo>
        </NextLink>
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
        {user ? (
          <NextLink href='/account'>
            <UserProfile>
              <Avatar name={user.username[0]} src={user.avatar} />
              <span>{user.username}</span>
            </UserProfile>
          </NextLink>
        ) : (
          <div>
            <AuthLinks>
              <NextLink href='/signin'>
                <NavLink>Sign in</NavLink>
              </NextLink>
              <NextLink href='/signup'>
                <AuthLink>Sign up</AuthLink>
              </NextLink>
            </AuthLinks>
          </div>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
