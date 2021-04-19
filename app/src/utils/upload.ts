import { gql, graphql } from '@utils/graphqlCall';
import { Error, IError } from '$types/inputs';

type Image = { url: string; id: string };

interface UploadResponse extends IError {
  image?: Image;
}

interface ReturnType {
  image?: Image;
  error?: Error;
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

const uploadImage = async (file: File): Promise<ReturnType> => {
  try {
    const { upload } = await graphql.request<{ upload: UploadResponse }>(UploadMutation, {
      file,
    });

    return {
      ...upload,
    };
  } catch (error) {
    return { error };
  }
};

export default uploadImage;
