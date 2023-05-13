import { Request, Response, NextFunction } from "express";
import { SearchHandler } from "../handlers";
import { HttpStatusCode } from "../exceptions";

export default class SearchController {
  static async searchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SearchHandler.searchAll(req.query.name);
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async searchChefs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SearchHandler.searchChefs(req.query.name);
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async searchDishes(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await SearchHandler.searchDishes(req.query.name);
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }
  static async searchRestaurants(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await SearchHandler.searchRestaurants(req.query.name);
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }
}
