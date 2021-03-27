import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { ErrorResponse } from '../../types/error';
import { GraphQLUpload } from 'graphql-upload';
import uploadStream, { Upload, cloudinary } from '../../utils/upload';

@ObjectType()
export class Image {
  @Field()
  url!: string;

  @Field()
  id!: string;
}

@ObjectType()
class UploadResponse extends ErrorResponse {
  @Field(() => Image, { nullable: true })
  image?: Image;
}

@Resolver()
class MediaResolver {
  @Mutation(() => UploadResponse)
  async upload(
    @Arg('file', () => GraphQLUpload) file: Upload,
    @Arg('folder') folder: string
  ): Promise<UploadResponse> {
    try {
      const result = await uploadStream(file, folder);
      return {
        image: {
          url: result.secure_url,
          id: result.public_id,
        },
      };
    } catch (error) {
      return {
        error: {
          field: 'file',
          message: error.message,
        },
      };
    }
  }

  @Mutation(() => Boolean)
  async deleteImage(@Arg('id') id: string) {
    const res = await cloudinary.v2.uploader.destroy(id);
    if (res.result === 'ok') return true;
    return false;
  }
}

export default MediaResolver;
