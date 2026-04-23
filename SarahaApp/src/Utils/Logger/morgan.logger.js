import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";

const _dirName = path.resolve();
export const attachRouterLogger = (app, routerPath, logsFileName) => {
  const logStream = fs.createWriteStream(
    path.join(_dirName, "./src/Utils/logger", logsFileName),
    { flags: "a" },
  );
  app.use(routerPath, morgan("combined", { stream: logStream }));
  app.use(routerPath, morgan("dev"));

};
