import express from 'express';
import {
  loginUser,  
  registerUser,
  logoutUser,
  getUserProfile,
  admins,
  getUsers,
  getUserById,
  updateUser,updateUserProfile,deletUser,  resetPasswordRequest,
  resetPassword} from '../controllers/userController.js';
  import {body, param} from 'express-validator';
  import validateRequest from '../middleware/validateRequest.js';
  import { protect, admin } from '../middleware/authMiddleware.js';


  const router = express.Router();
  const userValidator = {
  checkLogin: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .bail()
      .isEmail().withMessage("Please enter a valid email address"),

    body('password')
      .trim()
      .notEmpty().withMessage('Password is required')
  ],

  checkNewUser: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .bail()
      .isEmail().withMessage("Please enter a valid email address"),

    body('password')
      .trim()
      .notEmpty().withMessage('Password is required')
      .bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
  ],
};

 router.route('/')
  .post(userValidator.checkNewUser, validateRequest, registerUser)
 .get(protect, admin, getUsers);

  //router.post('/register',registerUser)

  router.post('/reset-password/request', resetPasswordRequest);
router.post('/reset-password/:id/:token', resetPassword);
  router.post('/login',  loginUser);
  router.post('/logout',logoutUser);
  

  router
  .route('/profile')
  .get(protect, getUserProfile)
  .put( protect, updateUserProfile);

  router.get('/admins', protect, admin, admins);

router
  .route('/:id')
  .get( protect, admin, getUserById)
  .put( protect, admin, updateUser)
  .delete( protect, admin, deletUser);


  

  router.get('/test', (req, res) => {
  res.send('users route works');
});
  export default router; 