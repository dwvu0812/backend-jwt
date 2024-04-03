import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () =>
  console.log(">>> JWT Backend is running on the port = " + PORT)
);
