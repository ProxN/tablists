import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import Upload from '@utils/upload';
import { useAuth } from '@context/auth.context';
import { IError, Error, UpdateProfileInputs, NewPasswordInputs } from '../types/inputs';
import { IUser } from '../types/entities';

interface ChangePassState {
  error?: Error | null;
  isLoading?: boolean;
  updated?: boolean;
}

interface UpdateProfileResponse extends IError {
  user?: IUser;
}

interface ChangePasswordResponse extends IError {
  changed?: boolean;
}

const UpdateProfileMutation = gql`
  mutation UpdateProfile($avatar: String, $username: String) {
    updateProfile(newProfile: { avatar: $avatar, username: $username }) {
      user {
        id
        username
        avatar
        email
        isDeleted
        isPrivate
        createdAt
        updatedAt
      }
      error {
        field
        message
      }
    }
  }
`;

const changePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      error {
        field
        message
      }
      changed
    }
  }
`;

const deleteAccountMutation = gql`
  mutation {
    deleteAccount
    logout
  }
`;

export const useProfile = () => {
  const [error, setError] = useState<Error>();
  const [updated, setUpdated] = useState(false);
  const { setAuth } = useAuth();

  const updateUser = async (data: UpdateProfileInputs) => {
    const { file, ...rest } = data;
    try {
      if (file) {
        const upload = await Upload(file);
        if (upload.image) {
          const { updateProfile } = await graphql.request<{
            updateProfile: UpdateProfileResponse;
          }>(UpdateProfileMutation, {
            avatar: upload.image?.url,
          });
          if (updateProfile.user) {
            setAuth(updateProfile.user);
          }
          setUpdated(true);
        }

        if (upload.error) {
          setError(upload.error);
        }
      } else {
        const res = await graphql.request<{ updateProfile: UpdateProfileResponse }>(
          UpdateProfileMutation,
          rest
        );

        if (res.updateProfile.user) {
          setAuth(res.updateProfile.user);
        }
        if (res.updateProfile.error) {
          setError(res.updateProfile.error);
        }
      }
    } catch (err) {
      setError({
        field: 'network',
        message: 'Something went worng! Please try again.',
      });
    }
  };

  return { updateUser, error, updated };
};

export const useChangePassword = () => {
  const [state, setState] = useState<ChangePassState>({});

  const mutate = async (data: NewPasswordInputs) => {
    try {
      setState({
        isLoading: true,
        updated: false,
        error: null,
      });
      const { changePassword } = await graphql.request<{
        changePassword: ChangePasswordResponse;
      }>(changePasswordMutation, data);

      setState({
        isLoading: false,
        error: changePassword.error,
        updated: changePassword.changed,
      });
    } catch (err) {
      setState({
        isLoading: false,
        error: {
          field: 'network',
          message: 'Something went worng! Please try again.',
        },
        updated: false,
      });
    }
  };

  return [mutate, state] as [typeof mutate, typeof state];
};

export const useDeleteAccount = () => {
  const [deleted, setDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { setAuth } = useAuth();

  const mutate = async () => {
    try {
      setIsLoading(true);
      const res = await graphql.request<{
        deleteAccount: boolean;
        logout: boolean;
      }>(deleteAccountMutation);
      if (res.deleteAccount && res.logout) {
        setDeleted(true);
        setAuth(null);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError({
        field: 'network',
        message: 'Something went worng! Please try again.',
      });
    }
  };

  return [mutate, { deleted, error, isLoading }] as [
    typeof mutate,
    {
      deleted: typeof deleted;
      error: typeof error;
      isLoading: typeof isLoading;
    }
  ];
};
