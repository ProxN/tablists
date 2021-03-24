import { Arg, Field, InputType, Mutation, ObjectType, Resolver, Ctx } from 'type-graphql';
import User from '../User/User.entity';
import { Context } from '../../types/context';
import sendEmail from '../../utils/sendEmail';
import * as authErrors from './errors';
import { ErrorResponse } from '../../types/error';
import validate, { isEmail } from './validate';

@InputType()
class AuthInputs {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
class AuthResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class ForgotPassResponse extends ErrorResponse {
  @Field(() => Boolean, { nullable: true })
  emailSent?: boolean;
}

@Resolver()
class AuthResolver {
  @Mutation(() => AuthResponse)
  async signup(
    @Arg('data') data: AuthInputs,
    @Ctx() { req }: Context
  ): Promise<AuthResponse> {
    const error = validate(data);
    if (error) {
      return { error };
    }

    let user;

    try {
      const username = data.email.split('@')[0] + Math.floor(Math.random() * 300);
      const { email, password } = data;
      user = await User.create({
        username,
        email,
        password,
      }).save();

      req.session.userId = user.id;
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          return { error: authErrors.EmailAlreadyExists };
        } else if (error.detail.includes('username')) {
          return { error: authErrors.UsernameAlreadyExists };
        }
      }
    }

    return { user };
  }

  @Mutation(() => AuthResponse)
  async signin(
    @Arg('data') data: AuthInputs,
    @Ctx() { req }: Context
  ): Promise<AuthResponse> {
    const error = validate(data);
    if (error) {
      return { error };
    }

    const user = await User.findOne({ where: { email: data.email } });
    if (!user || !(await user.comparePassword(user.password, data.password))) {
      return { error: authErrors.IncorrectEmailOrPassword };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => ForgotPassResponse)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: Context
  ): Promise<ForgotPassResponse> {
    if (!isEmail(email)) {
      return { error: authErrors.ValidEmail };
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { error: authErrors.EmailNotExists };
    }

    const { resetToken } = user.generateResetToken();

    await redis.set(resetToken, user.id, 'px', 1000 * 60 * 10); // 10min

    const resetURL = `<a href="http://localhost:3000/reset_password/${resetToken}">${resetToken}</a>`;

    await sendEmail({
      subject: 'Reset your password!!',
      to: user.email,
      message: `Reset your password using this link:${resetURL}`,
    });

    return { emailSent: true };
  }

  @Mutation(() => AuthResponse)
  async resetPassword(
    @Arg('resetToken') resetToken: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: Context
  ) {
    if (!newPassword) {
      return { error: authErrors.PasswordIsRequired };
    }
    if (newPassword.length < 8) {
      return { error: authErrors.PasswordLength };
    }
    const userId = await redis.get(resetToken);
    if (!userId) {
      return { error: authErrors.InvalidToken };
    }

    const user = await User.findOne(userId);

    if (!user) {
      return { error: authErrors.UserNotExists };
    }

    user.password = newPassword;
    await user.save();

    await redis.del(resetToken);

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res, req }: Context) {
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
  }
}

export default AuthResolver;
