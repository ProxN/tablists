import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../../types/context';
import User from './User.entity';

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (req.session.userId) {
      return User.findOne(req.session.userId);
    }
    return null;
  }
}

export default UserResolver;
