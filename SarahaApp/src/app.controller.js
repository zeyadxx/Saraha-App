import helmet from "helmet";
import { connectDB } from "./DB/connection.js";
import { authRouter, userRouter } from "./Modules/index.js";
import { err } from "./Utils/response/index.js";
import cors from "cors";
const bootstrap = async (app, express) => {
  app.use(express.json(), cors(), helmet());

  //DB connection
  await connectDB();

  //routing
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  //url not found
  app.all("/*dumy", (req, res) => {
    throw err.NotFoundException({ message: "Not found handler!!" });
  });

  //Error Handling Middleware
  app.use(err.GlobleErrorHandler);
};

export default bootstrap;
