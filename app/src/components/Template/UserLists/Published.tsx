import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';
import { IList } from '$types/entities';
import { Table, TableData, TableHead, TableRow } from './Shared.styles';

interface PublishedLists {
  lists?: IList[];
}

const Published: React.FC<PublishedLists> = ({ lists }) => {
  if (!lists || lists.length === 0) {
    return <Text>You have no published lists</Text>;
  }
  return (
    <>
      <Text>NOTE: You can no longer delete a list once it&apos;s published</Text>
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
              <Button size='small'>edit</Button>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default Published;
