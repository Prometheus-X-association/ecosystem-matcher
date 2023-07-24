import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { loadMongoose } from "./config/database";
import r from "./routes";

export const startServer = (testPort?: number) => {
  loadMongoose();

  const app: Application = express();
  const port = testPort || process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  app.use(r);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  });

  // Start the server
  const server = app.listen(port, () => {
    //eslint-disable-next-line
    console.log(`Catalog-Registry running on: http://localhost:${port}`);
  });

  return { server, app }; // For tests
};
