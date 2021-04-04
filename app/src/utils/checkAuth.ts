import { GetServerSidePropsContext } from 'next';
import { gql, graphql } from './graphqlCall';
import { IUser } from '../types/entities';

const MeQuery = gql`
  {
    me {
      id
      email
      username
    }
  }
`;

const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { cookie } = ctx.req.headers;
  if (!cookie) return { props: {} };

  try {
    await graphql.request<{ me: IUser }>(
      MeQuery,
      {},
      {
        cookie,
      }
    );
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default checkAuth;
