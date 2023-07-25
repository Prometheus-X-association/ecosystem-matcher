import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { loadMongoose } from "./config/database";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../docs/swagger.json";
import r from "./routes";

export const startServer = (testPort?: number, isTest = false) => {
  const connection = loadMongoose(isTest);

  const app: Application = express();
  const port = testPort || process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.use(r);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      return res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    } catch (error) {
      next(error);
    }
  });

  // Start the server
  const server = app.listen(port, () => {
    //eslint-disable-next-line
    console.log(`Catalog-Registry running on: http://localhost:${port}`);
  });

  return { server, app, connection }; // For tests
};
