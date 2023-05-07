import { NextFunction, Request, Response, Router } from "express";
import { v1Router } from "../../routes";

const apiRouter = Router();

apiRouter.get("/v1/test", (req, res) => {
  res.send("server is running");
});
apiRouter.use("/v1", v1Router);

export default apiRouter;
