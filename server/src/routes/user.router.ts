import { Router } from "express";
import { UserController } from "../controllers";
import {
  ValidationSchemas,
  ValidateObjectData,
  authAdminUser,
  authRegularUser,
} from "../middleware";

const UserRouter: Router = Router();
UserRouter.post( "/register", ValidateObjectData(ValidationSchemas.user.create), UserController.registerUser );
UserRouter.post( "/login", ValidateObjectData(ValidationSchemas.user.update), UserController.loginUser );
UserRouter.get( "/", ValidateObjectData(ValidationSchemas.user.update), authAdminUser, UserController.getAllUsers );
UserRouter.post( "/email", ValidateObjectData(ValidationSchemas.user.update), authRegularUser, UserController.getUserByEmail );
UserRouter.put( "/email", ValidateObjectData(ValidationSchemas.user.update), authRegularUser, UserController.updateUserByEmail );
UserRouter.put( "/password", ValidateObjectData(ValidationSchemas.user.update), authRegularUser, UserController.updatePasswordUserByEmail );
UserRouter.post("/logout", UserController.logoutUser);

export default UserRouter;
