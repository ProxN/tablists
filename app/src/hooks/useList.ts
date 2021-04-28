import { useQuery } from 'react-query';
import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import { Error, CreateListInputs, IError } from '$types/inputs';
import { IList } from '$types/entities';

interface IListState {
  isLoading?: boolean;
  error?: Error;
  list?: IList;
}

interface ListResponse {
  list?: IList;
  error?: Error;
}

interface DeleteListResponse extends IError {
  deleted?: boolean;
}
interface Response {
  createList?: ListResponse;
  editList?: ListResponse;
}

const ResponseData = `
    error{
        field
        message
    }
    list{
        id
        name
        type
        userId
        description
        image
        createdAt
        updatedAt
        published
    }
`;

const createListMutation = gql`
  mutation CreateList(
    $name: String!
    $type: String!
    $description: String!
    $image: String!
  ) {
    createList(
      data: { name: $name, type: $type, description: $description, image: $image }
    ) {
      error {
        field
        message
      }
      list {
        id
        name
      }
    }
  }
`;

const deleteListMutation = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId) {
      error {
        field
        message
      }
      deleted
    }
  }
`;

const editListMutation = gql`
  mutation EditList($listId:String!,$name:String,$description:String,$image:String,$type:String){
      editList(listId:$listId,data:{name:$name,description:$description,image:$image,type:$type}){
        ${ResponseData}
      }
  }
`;

const getUserListsQuery = gql`
  query GetUserLists($published: Boolean!) {
    getUserLists(published: $published) {
      id
      name
      type
    }
  }
`;

const getListQuery = gql`
  query GetList($listId:String!){
    getList(listId:$listId){
      ${ResponseData}
    }
  }
`;

const useListState = <I>(query: string, type: keyof Response) => {
  const [state, setState] = useState<IListState>({
    isLoading: false,
  });

  const mutate = async (data: I) => {
    try {
      const res = await graphql.request<Response>(query, data);
      setState({
        error: res[type]?.error,
        list: res[type]?.list,
        isLoading: false,
      });
    } catch (err) {
      setState({
        isLoading: false,
        error: {
          field: 'network',
          message: 'Something went worng! Please try again.',
        },
      });
    }
  };

  return [mutate, state] as [typeof mutate, typeof state];
};

export const useCreateList = () =>
  useListState<CreateListInputs>(createListMutation, 'createList');

export const useEditList = () =>
  useListState<
    {
      listId: string;
    } & CreateListInputs
  >(editListMutation, 'editList');

export const useDeleteList = () => {
  const [error, setError] = useState<Error>();
  const [deleted, setDeleted] = useState(false);

  const mutate = async (listId: string) => {
    setDeleted(false);
    try {
      const { deleteList } = await graphql.request<{ deleteList: DeleteListResponse }>(
        deleteListMutation,
        {
          listId,
        }
      );

      if (deleteList.error) {
        setError(deleteList.error);
      } else if (deleteList.deleted) {
        setDeleted(true);
      }
    } catch (err) {
      setError({
        field: 'network',
        message: 'Something went worng! Please try again.',
      });
    }
  };
  return [mutate, { deleted, error }] as [
    typeof mutate,
    {
      deleted: typeof deleted;
      error: typeof error;
    }
  ];
};

export const useUserLists = ({ published, key }: { published: boolean; key: string }) => {
  return useQuery(
    key,
    async () => {
      const { getUserLists } = await graphql.request<{ getUserLists: IList[] }>(
        getUserListsQuery,
        {
          published,
        }
      );
      return getUserLists;
    },
    {
      staleTime: 60 * 60 * 1000, // 1hour,
    }
  );
};

export const useGetList = ({ listId }: { listId: string }) => {
  return useQuery(['list', listId], async () => {
    const { getList } = await graphql.request<{ getList: ListResponse }>(getListQuery, {
      listId,
    });

    return getList.list;
  });
};
