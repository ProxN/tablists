import Container from '@components/Elements/Container';
import UserLists from '@components/Template/UserLists';
import withUser from '@utils/withUser';

const ListManager = () => {
  return (
    <Container>
      <UserLists />
    </Container>
  );
};

export default withUser(ListManager);
