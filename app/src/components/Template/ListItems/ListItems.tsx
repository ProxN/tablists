import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Button from '@components/Elements/Button';
import Card from '@components/Elements/Card';
import CreateListForm from '../CreateListForm';
import { ListGrid, AsideMenu } from './ListItems.styles';
import { IList } from '$types/entities';

const ListItems = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isItems, setIsItems] = useState(true);

  return (
    <ListGrid>
      <AsideMenu>
        <Button
          outline={!isItems}
          block
          status='default'
          onClick={() => setIsItems(true)}
        >
          Items
        </Button>
        <Button
          outline={isItems}
          block
          status='default'
          onClick={() => setIsItems(false)}
        >
          Info
        </Button>
      </AsideMenu>
      {isItems ? (
        <h1>items</h1>
      ) : (
        <Card title='Edit list info'>
          <CreateListForm
            list={queryClient.getQueryData(['list', router.query.id]) as IList}
          />
        </Card>
      )}
    </ListGrid>
  );
};

export default ListItems;
