import Button from '@components/Elements/Button';
import { Table, TableData, TableHead, TableRow } from './Shared.styles';

const Unpublished = () => {
  return (
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
          <div>
            <Button size='small'>edit</Button>
            <Button size='small' status='danger'>
              Delete
            </Button>
          </div>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>Best Movies</TableData>
        <TableData>movies</TableData>
        <TableData>50</TableData>
        <TableData>
          <div>
            <Button size='small'>edit</Button>
            <Button size='small' status='danger'>
              Delete
            </Button>
          </div>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>Best Movies</TableData>
        <TableData>movies</TableData>
        <TableData>50</TableData>
        <TableData>
          <div>
            <Button size='small'>edit</Button>
            <Button size='small' status='danger'>
              Delete
            </Button>
          </div>
        </TableData>
      </TableRow>
    </Table>
  );
};

export default Unpublished;
