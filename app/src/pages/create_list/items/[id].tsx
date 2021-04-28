import { useRouter } from 'next/router';
import withUser from '@utils/withUser';
import { useGetList } from '@hooks/useList';
import Container from '@components/Elements/Container';
import ListItems from '@components/Template/ListItems';
import Loader from '@components/Elements/Loader';

const Items = () => {
  const router = useRouter();
  const { isLoading } = useGetList({ listId: router.query.id as string });

  if (isLoading) {
    return (
      <Container>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ListItems />
    </Container>
  );
};

export default withUser(Items);
