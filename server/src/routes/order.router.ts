import { Router } from "express";
import {orderController} from "../controllers";
import {
  ValidationSchemas,
  ValidateObjectData,
  authRegularUser,
  authAdminUser,
} from "../middleware";

const OrderRouter: Router = Router();

OrderRouter.get("/",authAdminUser, orderController.getAllOrders);
OrderRouter.get("/:id",authRegularUser, orderController.getOrder);
OrderRouter.get("/user/:userId",authRegularUser, orderController.getOrdersByUserId);
OrderRouter.get("/restaurant/:restaurantId",authRegularUser, orderController.getOrdersByRestaurantId);
OrderRouter.put("/:id", ValidateObjectData(ValidationSchemas.order.update),authRegularUser, orderController.updateOrder);
OrderRouter.post("/", ValidateObjectData(ValidationSchemas.order.create),authRegularUser, orderController.addOrder);
OrderRouter.delete("/:id", orderController.deleteOrder);

export default OrderRouter;
