import Container from '@components/Elements/Container';
import AccountTabs from '@components/Elements/AccountTabs';
import Profile from '@components/Template/Profile';

const Account = () => {
  return (
    <Container width='90rem'>
      <AccountTabs />
      <Profile />
    </Container>
  );
};

export default Account;
