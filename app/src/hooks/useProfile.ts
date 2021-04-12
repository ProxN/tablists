import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import { useAuth } from '@context/auth.context';
import { IError, UpdateProfileInputs } from '../types/inputs';
import { IUser } from '../types/entities';

interface UploadResponse extends IError {
  image?: {
    url: string;
    id: string;
  };
}

interface UpdateProfileResponse extends IError {
  user?: IUser;
}

const UploadMutation = gql`
  mutation UploadAvatar($file: Upload!) {
    upload(file: $file, folder: "profile") {
      error {
        field
        message
      }
      image {
        url
        id
      }
    }
  }
`;

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

export const useProfile = () => {
  const [error, setError] = useState<{ field: string; message: string }>();
  const [updated, setUpdated] = useState(false);
  const { setAuth } = useAuth();

  const updateUser = async (data: UpdateProfileInputs) => {
    const { file, ...rest } = data;
    try {
      if (file) {
        const { upload } = await graphql.request<{ upload: UploadResponse }>(
          UploadMutation,
          { file }
        );
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

export const ts = '';
