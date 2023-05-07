import { Router } from "express";
import { ChefController } from "../controllers";
import { ValidationSchemas, ValidateObjectData, ValidateObjectDataArray } from "../middleware";

const chefRouter: Router = Router();
chefRouter.get("/", ChefController.getAllChefs);
chefRouter.get("/:id", ChefController.getChef);
chefRouter.put("/:id",ValidateObjectData(ValidationSchemas.chef.update), ChefController.updateChef);
chefRouter.post("/",ValidateObjectData(ValidationSchemas.chef.create), ChefController.addChef);
chefRouter.post("/many",ValidateObjectDataArray([ValidationSchemas.chef.create]), ChefController.addManyChefs);
chefRouter.delete("/:id", ChefController.deleteChef);

export default chefRouter;