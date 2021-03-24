import userEntity from './User/User.entity';
import authResolver from './Auth/Auth.resolver';
import userResolver from './User/User.resolver';

export const entities = [userEntity];

export const resolvers = [authResolver, userResolver] as const;
