import express from "express";
import {
  helloWorld,
  user,
  handleCreateNewUser,
} from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", helloWorld);
  router.get("/user", user);
  router.post("/users/create-user", handleCreateNewUser);

  return app.use("/", router);
};

export default initWebRoutes;
