import { Request, Response, NextFunction } from "express";
import { RestaurantHandler } from "../handlers";
import { HttpErrorMessage, HttpStatusCode, ErrorHandler } from "../exceptions";
import { IRestaurant } from "../models";

export default class RestaurantController {
  static async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.getAllRestaurants();
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.getRestaurant(req.params.id);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }
  static async getRestaurantByChefId( req: Request, res: Response, next: NextFunction){
    try{
      const data = await RestaurantHandler.getRestaurantByChefId(req.params.id);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send(data);
    }catch(err){
      next(err);
    }
  }
  static async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.updateRestaurant(req.params.id, req.body);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send({ res_message: HttpErrorMessage.OK, data });
    } catch (err) {
      next(err);
    }
  }

  static async addRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.addRestaurant(req.body as IRestaurant);
      res.status(HttpStatusCode.CREATED).send({ res_message: HttpErrorMessage.CREATED, data });
    } catch (err) {
      next(err);
    }
  }

  static async addManyRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.addManyRestaurants(req.body);
      res.status(HttpStatusCode.CREATED).send({ res_message: HttpErrorMessage.CREATED, data });
    } catch (err) {
      next(err);
    }
  }

  static async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantHandler.deleteRestaurant(req.params.id);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).send({ res_message: HttpErrorMessage.OK, data });
    } catch (err) {
      next(err);
    }
  }
}
