import { Router } from "express";
import { RestaurantController } from "../controllers";
import { ValidationSchemas, ValidateObjectData, ValidateObjectDataArray } from "../middleware";

const RestaurantRouter: Router = Router();

RestaurantRouter.get("/", RestaurantController.getAllRestaurants);
RestaurantRouter.get("/:id", RestaurantController.getRestaurant);
RestaurantRouter.get("/chef_restaurant/:id", RestaurantController.getRestaurantByChefId);
RestaurantRouter.put("/:id",ValidateObjectData(ValidationSchemas.restaurant.update), RestaurantController.updateRestaurant);
RestaurantRouter.post("/",ValidateObjectData(ValidationSchemas.restaurant.create), RestaurantController.addRestaurant);
RestaurantRouter.post("/many",ValidateObjectDataArray([ValidationSchemas.restaurant.create]), RestaurantController.addManyRestaurants);
RestaurantRouter.delete("/:id", RestaurantController.deleteRestaurant);

export default RestaurantRouter;
