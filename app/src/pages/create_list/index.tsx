import Card from '@components/Elements/Card';
import Container from '@components/Elements/Container';
import CreateListForm from '@components/Template/CreateListForm';
import withUser from '@utils/withUser';

const CreateList = () => {
  return (
    <Container width='85rem'>
      <Card title='Create new list'>
        <CreateListForm />
      </Card>
    </Container>
  );
};

export default withUser(CreateList);
