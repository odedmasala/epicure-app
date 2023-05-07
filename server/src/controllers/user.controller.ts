import { Request, Response, NextFunction } from "express";
import { UserHandler } from "../handlers";
import { HttpErrorMessage, HttpStatusCode, ErrorHandler } from "../exceptions";
import { IUser } from "../models";

export default class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserHandler.getAllUsers();
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });
      res.status(HttpStatusCode.OK).send(usersWithoutPassword);
    } catch (err) {
      next(err);
    }
  }
  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const user = await UserHandler.getUserByEmail(email);
      if (!user) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      const { password, isAdmin, ...userData } = user.toObject();
      res.status(HttpStatusCode.OK).send(userData);
    } catch (err) {
      next(err);
    }
  }
  static async updateUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const {email,...changeData} = req.body
      const data = await UserHandler.updateUserByEmail(email , changeData);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send({
        res_message: HttpErrorMessage.OK,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updatePasswordUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const {email,...changeData} = req.body
      const data = await UserHandler.updatePasswordUserByEmail(email , changeData);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send({
        res_message: HttpErrorMessage.OK,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserHandler.deleteUser(req.params.id);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send({
        res_message: HttpErrorMessage.OK,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, user } = await UserHandler.registerUser(req.body as IUser);
  
      const { password, isAdmin, ...userData } = user.toObject();
      req.session.user = user;
  
      res
        .status(HttpStatusCode.CREATED)
        .header("Authorization", `Bearer ${token}`)
        .send({
          res_message: HttpErrorMessage.CREATED,
          userData,
        });
    } catch (err) {
      next(err);
    }
  }
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const reqPassword = req.body.password;
      const { token, user } = await UserHandler.loginUser(email, reqPassword);
      const { password, isAdmin, ...userData } = user.toObject();

      // store user data in session
      req.session.user = user;
    
      res
        .status(HttpStatusCode.OK)
        .header("Authorization", `Bearer ${token}`)
        .send({
          res_message: HttpErrorMessage.OK,
          userData,
        });
    } catch (err) {
      next(err);
    }
  }
  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(); 
      res.header("Authorization", "");
      res.status(HttpStatusCode.OK).send({
        res_message: HttpErrorMessage.OK,
      });
    } catch (err) {
      next(err);
    }
  }
}
