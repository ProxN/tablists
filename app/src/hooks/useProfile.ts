import { useState } from 'react';
import { gql, graphql } from '@utils/graphqlCall';
import { useAuth } from '@context/auth.context';
import { IError } from '../types/inputs';
import { IUser } from '../types/entities';

interface UploadResponse extends IError {
  image?: {
    url: string;
    id: string;
  };
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

const UpdateAvatarMutation = gql`
  mutation UpdateProfile($avatar: String!) {
    updateProfile(newProfile: { avatar: $avatar }) {
      id
      username
      avatar
      email
      isDeleted
      isPrivate
      createdAt
      updatedAt
    }
  }
`;

export const useUpdateAvatar = () => {
  const [error, setError] = useState<{ field: string; message: string }>();
  const [updated, setUpdated] = useState(false);
  const { setAuth } = useAuth();

  const updateAvatar = async (file: File) => {
    try {
      const { upload } = await graphql.request<{ upload: UploadResponse }>(
        UploadMutation,
        { file }
      );
      if (upload.image) {
        const { updateProfile } = await graphql.request<{ updateProfile: IUser }>(
          UpdateAvatarMutation,
          {
            avatar: upload.image?.url,
          }
        );
        setAuth(updateProfile);
        setUpdated(true);
      }

      if (upload.error) {
        setError(upload.error);
      }
    } catch (err) {
      setError({
        field: 'network',
        message: 'Something went worng! Please try again.',
      });
    }
  };

  return { updateAvatar, error, updated };
};

export const ts = '';
