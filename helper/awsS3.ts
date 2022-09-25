import fs from 'fs';
import S3, { PutObjectRequest } from 'aws-sdk/clients/s3';
import { getFileType } from './getFileType';

const bucketName = process.env.MEDIA_AWS_BUCKET_NAME;
const region = process.env.MEDIA_AWS_BUCKET_REGION;
const accessKeyId = process.env.MEDIA_AWS_ACCESS_KEY;
const secretAccessKey = process.env.MEDIA_AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

interface FileDetail {
  mimetype: string;
  filepath: string;
  newFilename: string;
}

// uploads a file to s3
export const uploadFile = (file: FileDetail) => {
  const fileStream = fs.createReadStream(file.filepath);
  const type = getFileType(file.mimetype);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${type}s/${file.newFilename}`,
  };

  return s3.upload(uploadParams as PutObjectRequest).promise();
};

// downloads a file from s3
export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams as PutObjectRequest).createReadStream();
};
