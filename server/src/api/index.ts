import userEntity from './User/User.entity';
import listEntity from './List/List.entity';
import authResolver from './Auth/Auth.resolver';
import userResolver from './User/User.resolver';
import mediaResolver from './Media/Media.resolver';
import listResolver from './List/List.resolver';

export const entities = [userEntity, listEntity];
export const resolvers = [
  authResolver,
  userResolver,
  mediaResolver,
  listResolver,
] as const;
