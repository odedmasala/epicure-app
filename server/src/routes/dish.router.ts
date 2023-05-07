import { Router } from "express";
import { DishController } from "../controllers";
import { ValidationSchemas, ValidateObjectData, ValidateObjectDataArray } from "../middleware";

const DishRouter: Router = Router();

DishRouter.get("/", DishController.getAllDishes);
DishRouter.get("/:id", DishController.getDish);
DishRouter.get("/restaurant_dishes/:id", DishController.getDishByRestaurantId);
DishRouter.put("/:id",ValidateObjectData(ValidationSchemas.dish.update), DishController.updateDish);
DishRouter.post("/",ValidateObjectData(ValidationSchemas.dish.create), DishController.addDish);
DishRouter.post("/many",ValidateObjectDataArray([ValidationSchemas.dish.create]), DishController.addManyDishes);
DishRouter.delete("/:id", DishController.deleteDish);

export default DishRouter;
