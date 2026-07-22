import path from 'path'; //to handle file paths safely (cross-platform)
import fs from 'fs'; //file system (read, delete, check files)



export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log('File deleted!');
  } catch (error) {
    console.log('File not found or error deleting');
  }
};