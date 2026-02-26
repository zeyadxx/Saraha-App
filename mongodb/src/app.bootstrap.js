import express from "express";
import { authDB } from "./DB/connection.js";
import bookRouter from "./modules/books/book.controller.js";
import authorRouter from "./modules/authors/author.controller.js";
import logsRouter from "./modules/logs/log.controller.js";
const app = express();

export const bootstrap = async () => {
  app.use(express.json());

  //test connection with DB
  await authDB();

  app.use("/books", bookRouter);

  app.use("/author", authorRouter);

  app.use("/logs", logsRouter);
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
};
