import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: 'Token not provided',
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    console.log(decoded);
    return next();
  } catch (err) {
    console.log(token);
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }
};
