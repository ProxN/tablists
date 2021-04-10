import AccountTabs from '@components/Elements/AccountTabs';
import Container from '@components/Elements/Container';
import checkAuth from '@utils/checkAuth';

const Password = () => {
  return (
    <Container width='90rem'>
      <AccountTabs />
    </Container>
  );
};

export const getServerSideProps = checkAuth;

export default Password;
