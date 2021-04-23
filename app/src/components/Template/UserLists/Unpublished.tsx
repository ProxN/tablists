import { useEffect } from 'react';
import NextLink from 'next/link';
import { useQueryClient } from 'react-query';
import { useDeleteList } from '@hooks/useList';
import useModal from '@hooks/useModalState';
import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';
import { IList } from '$types/entities';
import { Table, TableData, TableHead, TableRow } from './Shared.styles';

interface UnpublishedProps {
  lists?: IList[];
}

const Unpublished: React.FC<UnpublishedProps> = ({ lists }) => {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const [deleteList, { deleted }] = useDeleteList();

  useEffect(() => {
    if (deleted) {
      queryClient.invalidateQueries('unpublished_lists');
      closeModal();
    }
  }, [deleted]);

  if (!lists || lists.length === 0) {
    return <Text>You have no unpublished lists</Text>;
  }

  const handleDeleteList = (id: string) => {
    openModal({
      body: 'Are you sure you want to delete this list? This cannot be undone.',
      props: {
        title: 'Delete List',
        handler: () => deleteList(id),
      },
    });
  };

  return (
    <Table>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Items</TableHead>
        <TableHead />
      </TableRow>
      {lists.map((el) => (
        <TableRow key={el.id}>
          <TableData>{el.name}</TableData>
          <TableData>{el.type}</TableData>
          <TableData>{el.itemsCount ?? 0}</TableData>
          <TableData>
            <div>
              <NextLink href={`/create_list/items/${el.id}`}>
                <Button size='small'>edit</Button>
              </NextLink>
              <Button
                onClick={() => handleDeleteList(el.id)}
                size='small'
                status='danger'
              >
                Delete
              </Button>
            </div>
          </TableData>
        </TableRow>
      ))}
    </Table>
  );
};

export default Unpublished;
