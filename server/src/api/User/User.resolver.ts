import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Context } from '../../types/context';
import User from './User.entity';
import * as userErrors from './errors';
import { ErrorResponse } from '../../types/error';

@ObjectType()
class changePasswordRes extends ErrorResponse {
  @Field(() => Boolean, { nullable: true })
  changed?: boolean;
}

@ObjectType()
class UpdateProfileRes extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UpdateProfileInputs implements Partial<User> {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (req.session.userId) {
      return User.findOne(req.session.userId);
    }
    return null;
  }

  @Authorized()
  @Mutation(() => UpdateProfileRes)
  async updateProfile(
    @Arg('newProfile') newProfile: UpdateProfileInputs,
    @Ctx() { req }: Context
  ): Promise<UpdateProfileRes> {
    let updatedUser;
    try {
      await User.update({ id: req.session.userId }, newProfile);

      updatedUser = await User.findOne(req.session.userId);
    } catch (error) {
      if (error.code === '23505') {
        return { error: userErrors.usernameAlreadyExists };
      }
    }

    return { user: updatedUser };
  }

  @Authorized()
  @Mutation(() => changePasswordRes)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { req }: Context
  ) {
    if (!oldPassword) {
      return { error: userErrors.oldPasswordRequired };
    }
    if (!newPassword) {
      return { error: userErrors.newPasswordRequired };
    }

    const user = await User.findOne(req.session.userId);

    if (!user || !(await user.comparePassword(user.password, oldPassword))) {
      return { error: userErrors.oldPasswordIncorrect };
    }

    user.password = newPassword;
    await user?.save();

    return { changed: true };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() { req, res }: Context): Promise<boolean> {
    try {
      await User.update(
        { id: req.session.userId },
        {
          isDeleted: true,
          isPrivate: true,
        }
      );
      return new Promise((resolve) => {
        req.session.destroy((err) => {
          res.clearCookie('sid');
          if (err) {
            resolve(false);
            return;
          }

          resolve(true);
        });
      });
    } catch (error) {
      return false;
    }
  }
}

export default UserResolver;
