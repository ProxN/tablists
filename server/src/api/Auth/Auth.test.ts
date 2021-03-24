import { Connection } from 'typeorm';
import { expect } from 'chai';
import testConnection, { RedisMock } from '../../utils/testConnection';
import graphqlCall from '../../utils/graphqlCall';
import User from '../User/User.entity';
import * as authErros from './errors';

const signupMutation = `
    mutation Signup($email:String!,$password:String!){
        signup(data:{email:$email,password:$password}){
          error{
            field
            message
          }
            user{
                id
                email
                username
            }
        }
    }
`;

const signinMutation = `
    mutation Signin($email:String!,$password:String!){
        signin(data:{email:$email,password:$password}){
          error{
            field
            message
          }
            user{
                id
                email
                username
            }
        }
    }
`;

const resetPasswordMutation = `
    mutation ResetPassword($resetToken:String!,$newPassword:String!){
        resetPassword(resetToken:$resetToken,newPassword:$newPassword){
          error{
            field
            message
          }
            user{
                id
                email
                username
            }
        }
    }
`;

let conn: Connection;
const desc = 'User Authentcation';

describe(desc, () => {
  before(async () => {
    conn = await testConnection();
  });

  after(async () => {
    await conn.close();
  });

  describe(`${desc} => Sign up`, () => {
    it('Should signup a new user', async () => {
      const user = {
        email: 'test@test.com',
        password: 'testtest',
      };
      const { data } = await graphqlCall({
        source: signupMutation,
        variableValues: user,
      });

      expect(data?.signup.user).to.have.property('email', user.email);
      const userDB = await User.findOne(data?.signup.user.id);
      expect(userDB).to.be.not.undefined;
      expect(userDB).to.have.property('id', data?.signup.user.id);
      expect(userDB).to.have.property('username', data?.signup.user.username);
    });

    it('Should return an error when fields are empty', async () => {
      const { data } = await graphqlCall({
        source: signupMutation,
        variableValues: {
          email: '',
          password: 'testtest',
        },
      });
      const { data: data2 } = await graphqlCall({
        source: signupMutation,
        variableValues: {
          email: 'test2@gmail.com',
          password: '',
        },
      });

      expect(data?.signup.error).to.deep.equal(authErros.EmailIsRequired);
      expect(data2?.signup.error).to.deep.equal(authErros.PasswordIsRequired);
    });

    it('Should return an error if email already exists', async () => {
      const { data } = await graphqlCall({
        source: signupMutation,
        variableValues: {
          email: 'test@test.com',
          password: 'testtest',
        },
      });

      expect(data?.signup.error).to.deep.equal(authErros.EmailAlreadyExists);
    });
  });

  describe(`${desc} => Sign in `, () => {
    it('Should sign in a user', async () => {
      const userDB = await User.create({
        email: 'test3@gmail.com',
        username: 'test33',
        password: 'testtest',
      }).save();

      const { data } = await graphqlCall({
        source: signinMutation,
        variableValues: {
          email: userDB.email,
          password: 'testtest',
        },
      });

      expect(data?.signin.user).to.have.property('id', userDB.id);
      expect(data?.signin.user).to.have.property('email', userDB.email);
      expect(data?.signin.user).to.have.property('username', userDB.username);
    });

    it('Should return an error if email or password is incorrect', async () => {
      const { data } = await graphqlCall({
        source: signinMutation,
        variableValues: {
          email: 'notExists@gmail.com',
          password: 'notexists',
        },
      });

      expect(data?.signin.error).to.deep.equal(authErros.IncorrectEmailOrPassword);
    });
  });

  describe(`${desc} => Reset Password`, () => {
    it('Should reset a user password', async () => {
      const userDB = await User.create({
        email: 'test5@gmail.com',
        username: 'test55',
        password: 'testtest',
      }).save();

      const { resetToken } = userDB.generateResetToken();
      RedisMock.set(resetToken, userDB.id, 'px', 1000 * 60);

      const { data } = await graphqlCall({
        source: resetPasswordMutation,
        variableValues: {
          resetToken,
          newPassword: 'test1test',
        },
      });

      expect(data?.resetPassword.error).to.be.null;
      expect(data?.resetPassword.user).to.have.property('username', userDB.username);
      expect(data?.resetPassword.user).to.have.property('email', userDB.email);
    });

    it('Should return an error if token is invalid or expired', async () => {
      const userDB = await User.create({
        email: 'test6@gmail.com',
        username: 'test66',
        password: 'testtest',
      }).save();

      const { resetToken } = userDB.generateResetToken();

      const { data } = await graphqlCall({
        source: resetPasswordMutation,
        variableValues: {
          resetToken,
          newPassword: 'test1test',
        },
      });

      expect(data?.resetPassword.user).to.be.null;
      expect(data?.resetPassword.error).to.deep.equal(authErros.InvalidToken);
    });
  });
});
