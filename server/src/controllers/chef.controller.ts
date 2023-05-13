import { Request, Response, NextFunction } from "express";
import { ChefHandler } from "../handlers";
import { HttpErrorMessage, HttpStatusCode } from "../exceptions";

export default class ChefController {
  static async getAllChefs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.getAllChefs();
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async getChef(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.getChef(req.params.id);
      res.status(HttpStatusCode.OK).send(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateChef(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.updateChef(req.params.id, req.body);
      res.status(HttpStatusCode.OK).send({ res_message: HttpErrorMessage.OK ,data});
    } catch (err) {
      next(err);
    }
  }

  static async addChef(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.addChef(req.body);
      res.status(HttpStatusCode.CREATED).send({ res_message: HttpErrorMessage.CREATED ,data});
    } catch (err) {
      next(err);
    }
  }
  static async addManyChefs(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.addManyChefs(req.body);
      res
        .status(HttpStatusCode.CREATED)
        .send({ res_message: HttpErrorMessage.CREATED ,data});
    } catch (err) {
      next(err);
    }
  }
  static async deleteChef(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ChefHandler.deleteChef(req.params.id);
      res.status(HttpStatusCode.OK).send({ res_message: HttpErrorMessage.OK, data });
    } catch (err) {
      next(err);
    }
  }

}
