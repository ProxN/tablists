import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';
import { Table, TableData, TableHead, TableRow } from './Shared.styles';

const Published = () => {
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
        <TableRow>
          <TableData>Best Movies</TableData>
          <TableData>movies</TableData>
          <TableData>50</TableData>
          <TableData>
            <Button size='small'>edit</Button>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Best Movies</TableData>
          <TableData>movies</TableData>
          <TableData>50</TableData>
          <TableData>
            <Button size='small'>edit</Button>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Best Movies</TableData>
          <TableData>movies</TableData>
          <TableData>50</TableData>
          <TableData>
            <Button size='small'>edit</Button>
          </TableData>
        </TableRow>
      </Table>
    </>
  );
};

export default Published;
