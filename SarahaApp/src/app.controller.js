import helmet from "helmet";
import { connectDB } from "./DB/connection.js";
import { authRouter, messageRouter, userRouter } from "./Modules/index.js";
import { err } from "./Utils/response/index.js";
import cors from "cors";
import { attachRouterLogger } from "./Utils/Logger/morgan.logger.js";
import { customRateLimiter } from "./Middlewares/rate.limtter.middleware.js";
const bootstrap = async (app, express) => {

  app.use(express.json(), cors(), helmet());

  //rate limiter
  app.use(customRateLimiter)
  
  //DB connection
  await connectDB();

 //logger
  attachRouterLogger(app, "/auth", "auth.logger");
  attachRouterLogger(app, "/user", "user.logger");
  attachRouterLogger(app, "/message", "message.logger");

  //routing
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  //url not found
  app.all("/*dumy", (req, res) => {
    throw err.NotFoundException({ message: "Not found handler!!" });
  });

  //Error Handling Middleware
  app.use(err.GlobleErrorHandler);
};

export default bootstrap;
