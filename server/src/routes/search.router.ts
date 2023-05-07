import { Router } from "express";
import { SearchController } from "../controllers";

const searchRouter: Router = Router();

searchRouter.get("/", SearchController.searchAll);
searchRouter.get("/chefs", SearchController.searchChefs);
searchRouter.get("/dishes", SearchController.searchDishes);
searchRouter.get("/restaurants", SearchController.searchRestaurants);

export default searchRouter;
