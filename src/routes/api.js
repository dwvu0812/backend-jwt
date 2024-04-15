import express from "express";
import {
  handleRegister,
  testApi,
  handleLogin,
} from "../controller/apiController";
import userController from "../controller/userController";

const router = express.Router();

const initApiRoutes = (app) => {
  //api
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  router.get("/user/read", userController.readUser);
  router.post("user/create", userController.createUser);
  router.put("user/update", userController.updateUser);
  router.delete("user/delete", userController.deleteUser);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
