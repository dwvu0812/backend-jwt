import express from "express";
import {
  helloWorld,
  user,
  handleCreateNewUser,
  handleGetUsersList,
  handleDeleteUser,
} from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", helloWorld);
  router.get("/user", handleGetUsersList);
  router.post("/users/create-user", handleCreateNewUser);
  router.post("/delete-user/:id", handleDeleteUser);

  return app.use("/", router);
};

export default initWebRoutes;
