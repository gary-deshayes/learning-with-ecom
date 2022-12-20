import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Merchant } from '../models/Merchant';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token are not valid');
    }
    const decoded = jwt.verify(token, process.env.jwt_secret as Secret);
    (req as CustomRequest).token = decoded;
    const user = await Merchant.findOne({ _id: decoded._id })
    if (!user) {
      throw new Error('User dont exist')
    }
    (req as CustomRequest).user = user;
    next();
  } catch (err) {
    console.log(err);
    
    res.status(401).send('Please authenticate');
  }
};