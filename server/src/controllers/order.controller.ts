import { Request, Response, NextFunction } from "express";
import {OrderHandler} from "../handlers";
import { HttpStatusCode, ErrorHandler, HttpErrorMessage } from "../exceptions";

export default class OrderController {
  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderHandler.getAllOrders();
      res.status(HttpStatusCode.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderHandler.getOrder(req.params.id);
      if (!order) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderHandler.getOrdersByUserId(req.params.userId);
      res.status(HttpStatusCode.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrdersByRestaurantId(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderHandler.getOrdersByRestaurantId(req.params.restaurantId);
      res.status(HttpStatusCode.OK).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedOrder = await OrderHandler.updateOrder(req.params.id, req.body);
      if (!updatedOrder) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedOrder = await OrderHandler.deleteOrder(req.params.id);
      if (!deletedOrder) {
        throw ErrorHandler.createHttpError(
          HttpStatusCode.NOT_FOUND,
          HttpErrorMessage.NOT_FOUND
        );
      }
      res.status(HttpStatusCode.OK).json(deletedOrder);
    } catch (error) {
      next(error);
    }
  }

  static async addOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const newOrder = await OrderHandler.addOrder(req.body);
      res.status(HttpStatusCode.CREATED).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
}
