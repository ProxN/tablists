import userEntity from './User/User.entity';
import authResolver from './Auth/Auth.resolver';
import userResolver from './User/User.resolver';
import mediaResolver from './Media/Media.resolver';

export const entities = [userEntity];
export const resolvers = [authResolver, userResolver, mediaResolver] as const;
