import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
     name: {
      type: String,
      required: true
    },
   
    email: {
      type: String,
      required: true,
      unique: true
    },
   
    password: {
      type: String,
      required: true
    },
    // Indicates whether the user is an admin or not
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;