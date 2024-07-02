const { Upload } = require('@aws-sdk/lib-storage');
const { S3 } = require('@aws-sdk/client-s3');
require('dotenv').config();

// console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
// console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
// console.log('AWS_REGION:', process.env.AWS_REGION);
// console.log('AWS_S3_BUCKET_NAME:', process.env.AWS_S3_BUCKET_NAME);

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

// Upload a file
const uploadFile = async (fileContent, fileName) => {
  console.log('fileName', fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to upload
    Body: fileContent, // the buffer
    // ACL: 'public-read', // Make the file publicly readable
  };

  try {
    // Uploading files to the bucket
    const data = await new Upload({
      client: s3,
      params,
    }).done();
    console.log(`File uploaded successfully. ${data.Location}`);
    // return the URL of the object on S3
    return data.Location;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};

// Delete a file
const deleteFile = async (fileName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3.deleteObject(params);
    console.log('File deleted successfully:', fileName);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = { uploadFile, deleteFile };
