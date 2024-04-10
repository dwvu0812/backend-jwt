import express from "express";
import {
  helloWorld,
  user,
  handleCreateNewUser,
  handleGetUsersList,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUser,
} from "../controller/homeController";
import { testApi } from "../controller/apiController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", helloWorld);
  router.get("/user", handleGetUsersList);
  router.post("/users/create-user", handleCreateNewUser);
  router.post("/delete-user/:id", handleDeleteUser);
  router.get("/update-user/:id", getUpdateUser);
  router.post("/update-user/:id", handleUpdateUser);

  //api
  router.get("/api/test-api", testApi);

  return app.use("/", router);
};

export default initWebRoutes;
