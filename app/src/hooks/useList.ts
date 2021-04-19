import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import Upload from '@utils/upload';
import { IError, Error, CreateListInputs } from '$types/inputs';
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

interface Response {
  createList?: ListResponse;
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

export const useEditList = () => {};
