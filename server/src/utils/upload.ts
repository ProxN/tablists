import cloudinary, { UploadApiResponse } from 'cloudinary';
import { Stream } from 'stream';

const { CLOUDINARY_NAME, CLOUDINARY_SECRET, CLOUDINARY_API_KEY } = process.env;

cloudinary.v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export interface Upload {
  createReadStream: () => Stream;
  filename: string;
  mimetype: string;
  encoding: string;
}

const uploadStream = (file: Upload, folder: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: folder, allowed_formats: ['png', 'jpg'] },
      (err, res) => {
        if (res) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      }
    );

    file.createReadStream().pipe(uploadStream);
  });
};

export { cloudinary };

export default uploadStream;
