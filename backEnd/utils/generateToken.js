import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: req.body.remember ? '365d' : '24h',
    }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: req.body.remember
      ? 365 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000,
  });
};