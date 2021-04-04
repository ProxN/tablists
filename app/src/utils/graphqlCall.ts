import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_API_URL as string;

const graphql = new GraphQLClient(endpoint, { credentials: 'include' });

export { gql, graphql };
