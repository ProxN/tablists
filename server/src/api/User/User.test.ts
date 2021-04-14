import { Connection } from 'typeorm';
import { expect } from 'chai';
import testConnection from '../../utils/testConnection';
import graphqlCall from '../../utils/graphqlCall';
import User from './User.entity';
import * as userErrors from './errors';

const userInfo = `    
id
username
email
isPrivate
isDeleted
avatar`;

const meQuery = `
    {
        me{
         ${userInfo}
        }
    }
`;

const updateProflielMutation = `
    mutation UpdateProfile($username:String!,$avatar:String!){
        updateProfile(newProfile:{username:$username,avatar:$avatar}){
          error{
            field
            message
          }
          user{
            ${userInfo}
          }
        }
    }
`;

const changePasswordMutation = `
    mutation ChangePassword($oldPassword:String!,$newPassword:String!){
        changePassword(oldPassword:$oldPassword,newPassword:$newPassword){
            error{
                field
                message
            }
            changed
        }
    }
`;

let conn: Connection;
const desc = 'User Profile';

describe(desc, () => {
  before(async () => {
    conn = await testConnection();
  });

  after(async () => {
    await conn.close();
  });

  it('Should get user profile', async () => {
    const userDB = await User.create({
      username: 'usp1',
      email: 'userprofile1@gmail.com',
      password: 'testtest',
    }).save();

    const { data } = await graphqlCall({
      source: meQuery,
      userId: userDB.id,
    });

    expect(data?.me).to.have.property('username', userDB.username);
    expect(data?.me).to.have.property('email', userDB.email);
  });

  it('Should update a user profile', async () => {
    const newProfile = {
      avatar: 'https://wallpapercave.com/wp/wp7151794.jpg',
      username: 'newusp3',
    };
    const userDB = await User.create({
      username: 'usp2',
      email: 'userprofile2@gmail.com',
      password: 'testtest',
    }).save();

    const { data } = await graphqlCall({
      source: updateProflielMutation,
      userId: userDB.id,
      variableValues: newProfile,
    });

    expect(data?.updateProfile.user).to.have.property('avatar', newProfile.avatar);
    expect(data?.updateProfile.user).to.have.property('username', newProfile.username);
  });

  describe(`${desc} => change password`, () => {
    it('Should change user password', async () => {
      const userDB = await User.create({
        username: 'usp3',
        email: 'userprofile3@gmail.com',
        password: 'testtest',
      }).save();

      const { data } = await graphqlCall({
        source: changePasswordMutation,
        userId: userDB.id,
        variableValues: {
          oldPassword: 'testtest',
          newPassword: 'newpass1',
        },
      });

      expect(data?.changePassword).to.have.property('changed', true);
    });

    it('Should return an error if old password is incorrect', async () => {
      const userDB = await User.create({
        username: 'usp4',
        email: 'userprofile4@gmail.com',
        password: 'testtest',
      }).save();

      const { data } = await graphqlCall({
        source: changePasswordMutation,
        userId: userDB.id,
        variableValues: {
          oldPassword: 'incorrect',
          newPassword: 'newpass1',
        },
      });

      expect(data?.changePassword.error).to.deep.equal(userErrors.oldPasswordIncorrect);
    });
  });
});
