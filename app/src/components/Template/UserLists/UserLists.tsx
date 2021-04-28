import { useState } from 'react';
import NextLink from 'next/link';
import { useUserLists } from '@hooks/useList';
import Button from '@components/Elements/Button';
import Icon from '@components/Elements/Icon';
import Loader from '@components/Elements/Loader';
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
  const { data, isLoading } = useUserLists({
    published: publishedList,
    key: publishedList ? 'published_lists' : 'unpublished_lists',
  });

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
          <NextLink href='/create_list'>
            <Button>
              <Icon name='plus' />
              New list
            </Button>
          </NextLink>
        </BoxHeader>
        {isLoading ? (
          <Loader size='small' />
        ) : publishedList ? (
          <Published lists={data} />
        ) : (
          <Unpublished lists={data} />
        )}
      </Box>
    </UserListsContainer>
  );
};

export default UserLists;
