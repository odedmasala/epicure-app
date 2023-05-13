import express from "express";
import { chefsRouter, restaurantRouter, dishRouter,searchRouter,userRouter, orderRouter } from "../../../routes";

const v1Router = express.Router();

v1Router.use("/chef", chefsRouter);
v1Router.use("/restaurant", restaurantRouter);
v1Router.use("/dish", dishRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/user", userRouter);
v1Router.use("/order", orderRouter);

export default v1Router;
