const {
  Upload,
} = require('@aws-sdk/lib-storage');

const {
  S3,
} = require('@aws-sdk/client-s3');

// dotenv helps manage environment variables
require('dotenv').config();

// The name of the bucket that you have created
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// we load credentials from the .env file
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

// upload a file
const uploadFile = async (fileContent, fileName) => {
  // console.log('fileName', fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName, // File name we want to upload
    Body: fileContent, // the buffer
    ACL: 'public-read', // Make the file publicly readable
  };

  // Uploading files to the bucket

  const data = await new Upload({
    client: s3,
    params,
  }).done();
  // console.log(`File uploaded successfully. ${data.Location}`);
  // return the URL of the object on S3
  return data.Location;
};

// delete a file
const deleteFile = (fileName) => {
  // Setting up S3 delete parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to delete
  };

  // download file from the bucket
  return s3.deleteObject(params).promise()
    .then(() => true)
    .catch(() => false);
};

module.exports = { uploadFile, deleteFile };
