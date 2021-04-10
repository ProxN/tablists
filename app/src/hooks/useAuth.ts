import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import { AuthInputs, IError } from '../types/inputs';
import { IUser } from '../types/entities';

interface AuthResponse extends IError {
  user?: IUser;
  emailSent?: boolean;
}

interface ResetPassword {
  newPassword: string;
  resetToken: string;
}

interface IAuthState {
  isLoading: boolean;
  error?: {
    field?: string;
    message?: string;
  };
  user?: IUser;
  emailSent?: boolean;
}

interface Response {
  signin?: AuthResponse;
  signup?: AuthResponse;
  resetPassword?: AuthResponse;
  forgotPassword?: AuthResponse;
}

const ResponseData = `
    error{
      field
      message
    }
    user{
        id
        username
        avatar
        email
        isDeleted
        isPrivate
        createdAt
        updatedAt
    }
`;

const UserQuery = gql`
  {
    me {
      id
      username
      avatar
      email
      isDeleted
      isPrivate
      updatedAt
      createdAt
    }
  }
`;

const signinMutation = gql`
    mutation Signin($email:String!,$password:String!){
        signin(data:{email:$email,password:$password}){
            ${ResponseData}
        }
    }
`;

const signupMutation = gql`
    mutation Signup($email:String!,$password:String!){
        signup(data:{email:$email,password:$password}){
            ${ResponseData}
        }
    }
`;

const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      error {
        field
        message
      }
      emailSent
    }
  }
`;

const resetPasswordMutation = gql`
  mutation ResetPassword($resetToken:String!,$newPassword:String!){
    resetPassword(resetToken:$resetToken,newPassword:$newPassword){
      ${ResponseData}
    }
  }
`;

const useAuthState = <I>(query: string, type: keyof Response) => {
  const [state, setState] = useState<IAuthState>({ isLoading: false });

  const mutate = async (data: I) => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const res = await graphql.request<Response>(query, data);
      setState({
        user: res[type]?.user,
        error: res[type]?.error,
        emailSent: res[type]?.emailSent || false,
        isLoading: false,
      });
    } catch (error) {
      setState({
        isLoading: false,
        user: undefined,
        emailSent: false,
        error: {
          field: 'network',
          message: 'Something went worng! Please try again.',
        },
      });
    }
  };

  return [mutate, state] as [typeof mutate, typeof state];
};

export const useSignin = () => {
  return useAuthState<AuthInputs>(signinMutation, 'signin');
};

export const useSignup = () => {
  return useAuthState<AuthInputs>(signupMutation, 'signup');
};

export const useResetPassword = () => {
  return useAuthState<ResetPassword>(resetPasswordMutation, 'resetPassword');
};

export const useForgotPassword = () => {
  return useAuthState<{ email: string }>(forgotPasswordMutation, 'forgotPassword');
};

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const loadUser = async () => {
    try {
      const res = await graphql.request<{ me: IUser }>(UserQuery);
      setUser(res.me);
    } catch (error) {
      setUser(null);
    }
  };

  return { loadUser, user };
};
