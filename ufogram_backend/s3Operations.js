const { Upload } = require('@aws-sdk/lib-storage');
const { S3 } = require('@aws-sdk/client-s3');
require('dotenv').config();

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
  console.log('Attempting to upload file:', fileName);

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read',
  };

  try {
    const data = await new Upload({
      client: s3,
      params,
    }).done();
    
    console.log('File uploaded successfully:', data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;  // Rethrow the error after logging it
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
