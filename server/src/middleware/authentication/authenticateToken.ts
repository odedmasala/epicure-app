import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, HttpStatusCode, HttpErrorMessage } from '../../exceptions';
import { IUser } from '../../models';

export const authenticateToken = (req: Request, res: Response, next: NextFunction, isAdmin: boolean = false) => {
  const authHeader = req.headers.authorization;

  
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(ErrorHandler.createHttpError(
      HttpStatusCode.UNAUTHORIZED,
      HttpErrorMessage.UNAUTHORIZED
    ));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ErrorHandler.createHttpError(
        HttpStatusCode.FORBIDDEN,
        HttpErrorMessage.FORBIDDEN
      ));
    }

    const userData: IUser = user;
    if (isAdmin && !userData.isAdmin) {
      return next(ErrorHandler.createHttpError(
        HttpStatusCode.FORBIDDEN,
        HttpErrorMessage.FORBIDDEN
      ));
    }
    next();
  });
};

export const authRegularUser = (req: Request, res: Response, next: NextFunction) => authenticateToken(req, res, next);
  
  
  // Middleware to authenticate admin users
  export  const authAdminUser = (req: Request, res: Response, next: NextFunction) => authenticateToken(req, res, next, true)