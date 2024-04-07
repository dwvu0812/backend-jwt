import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test DB connection
connection();

configViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () =>
  console.log(">>> JWT Backend is running on the port = " + PORT)
);
