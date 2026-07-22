import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// FIXED storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), (req, res) => {
    console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'Image uploaded',
     imageUrl: `/uploads/${req.file.filename}`
  });
});

export default router;