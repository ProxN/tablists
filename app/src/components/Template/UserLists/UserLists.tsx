import Button from '@components/Elements/Button';
import Icon from '@components/Elements/Icon';
import { useState } from 'react';
import Published from './Published';
import Unpublished from './Unpublished';
import {
  Box,
  BoxHeader,
  BoxHeading,
  UserListsContainer,
  UserListsSide,
} from './UserLists.styles';

const UserLists = () => {
  const [publishedList, setPublishList] = useState(false);

  return (
    <UserListsContainer>
      <UserListsSide>
        <Button
          outline={publishedList}
          block
          status='default'
          onClick={() => setPublishList(false)}
        >
          Unpublished
        </Button>
        <Button
          outline={!publishedList}
          block
          status='default'
          onClick={() => setPublishList(true)}
        >
          published
        </Button>
      </UserListsSide>
      <Box>
        <BoxHeader>
          <BoxHeading>
            {publishedList ? 'Published Lists' : 'My unpublished lists'}
          </BoxHeading>
          <Button>
            <Icon name='plus' />
            New list
          </Button>
        </BoxHeader>
        {publishedList ? <Published /> : <Unpublished />}
      </Box>
    </UserListsContainer>
  );
};

export default UserLists;
