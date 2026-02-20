import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing admin token' });
  }

  const token = header.replace('Bearer ', '').trim();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};

export default adminAuth;

