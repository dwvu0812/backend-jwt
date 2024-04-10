import express from "express";
import {
  handleRegister,
  testApi,
  handleLogin,
} from "../controller/apiController";

const router = express.Router();

const initApiRoutes = (app) => {
  //api
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
