import { GetServerSidePropsContext } from 'next';
import { gql, graphql } from './graphqlCall';
import { IUser } from '../types/entities';

const MeQuery = gql`
  {
    me {
      id
      username
      avatar
      email
      isDeleted
      isPrivate
      createdAt
      updatedAt
    }
  }
`;

const authPath = ['/signup', '/signin', '/forgot_password', '/reset_password'];
interface Props {
  props: any;
  redirect?: {
    destination: string;
    permanent: boolean;
  };
}

const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { cookie } = ctx.req.headers;
  const obj: Props = { props: {} };

  if (!authPath.includes(ctx.resolvedUrl)) {
    obj.redirect = {
      destination: '/',
      permanent: false,
    };
  }

  if (!cookie) return obj;

  try {
    const req = await graphql.request<{ me: IUser }>(
      MeQuery,
      {},
      {
        cookie,
      }
    );
    return {
      props: { user: req.me },
    };
  } catch (error) {
    return obj;
  }
};

export default checkAuth;
