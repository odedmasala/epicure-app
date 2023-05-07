import { Request, Response, NextFunction } from "express";
import { DishHandler } from "../handlers";
import { HttpErrorMessage, HttpStatusCode, ErrorHandler } from "../exceptions";
import { IDish } from "../models";

export default class DishController {
  static async getAllDishes(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DishHandler.getAllDishes();
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async getDish(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DishHandler.getDish(req.params.id);
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
  static async getDishByRestaurantId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await DishHandler.getDishByRestaurantId(req.params.id);
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
  static async updateDish(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DishHandler.updateDish(req.params.id, req.body);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res
        .status(HttpStatusCode.OK)
        .send({ res_message: HttpErrorMessage.OK, data });
    } catch (err) {
      next(err);
    }
  }

  static async addDish(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DishHandler.addDish(req.body as IDish);
      res
        .status(HttpStatusCode.CREATED)
        .send({ res_message: HttpErrorMessage.CREATED, data });
    } catch (err) {
      next(err);
    }
  }
  static async addManyDishes(req: Request, res: Response, next: NextFunction) {
    try {
      const dishes = req.body as IDish[];
      const data = await DishHandler.addManyDishes(dishes);
      res
        .status(HttpStatusCode.CREATED)
        .send({ res_message: HttpErrorMessage.CREATED, data });
    } catch (err) {
      next(err);
    }
  }

  static async deleteDish(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DishHandler.deleteDish(req.params.id);
      if (!data) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res
        .status(HttpStatusCode.OK)
        .send({ res_message: HttpErrorMessage.OK, data });
    } catch (err) {
      next(err);
    }
  }
}
