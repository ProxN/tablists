import { useEffect } from 'react';
import { useAuth } from '@context/auth.context';
import Container from '@components/Elements/Container';
import AccountTabs from '@components/Elements/AccountTabs';
import Profile from '@components/Template/Profile';
import checkAuth from '@utils/checkAuth';
import { IUser } from 'types/entities';

interface AccountProps {
  user: IUser;
}

const Account: React.FC<AccountProps> = ({ user }) => {
  const { setAuth } = useAuth();

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, []);

  return (
    <Container width='90rem'>
      <AccountTabs />
      <Profile user={user} />
    </Container>
  );
};

export const getServerSideProps = checkAuth;

export default Account;
